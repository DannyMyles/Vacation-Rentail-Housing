"use client";
import React, { FC, ReactNode, useState, useEffect } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { CardDataType, StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import axios from "axios";
import { PropertyList } from "@/data/types";
// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {
  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };
  const [listProperty, setListProperty] = useState<StayDataType[]>([]);
  useEffect(() => {
    const fetchStayListings = async () => {
      const options = {
        method: "GET",
        url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map",
        params: {
          arrival_date: "2023-09-08",
          departure_date: "2023-11-07",
          room_qty: "1",
          guest_qty: "1",
          bbox: "14.291283,14.948423,120.755688,121.136864",
        },
        headers: {
          "X-RapidAPI-Key":
            "bed8d8672fmshba4b60b4b95db60p1cf23djsnf009a4d70736",
          "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request<{ result: PropertyList[] }>(
          options
        );
        // console.log("Search data", response.data.result);
        const stayData: StayDataType[] = response.data.result.map((v: any) => ({
          id: v.hotel_id,
          author: {
            id: 2,
            firstName: "Chariot",
            lastName: "Birrell",
            displayName: "Birrell Chariot",
            email: "cbirrell1@google.com.hk",
            gender: "Genderfluid",
            avatar: "https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
            count: 113,
            href: "/author",
            desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
            jobName: "Author Job",
            bgImage:
              "https://images.pexels.com/photos/5799379/pexels-photo-5799379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          },
          date: "May 20, 2021",
          href: "/listing-stay-detail",
          title: v.hotel_name,
          featuredImage: v.main_photo_url,
          commentCount: v.commentCount,
          viewCount: v.review_score,
          address: v.address,
          reviewStart: 0,
          reviewCount: v.review_score,
          like: false,
          galleryImgs: [v.main_photo_url],
          price: v.main_total_price,
          listingCategory: {
            id: 9,
            name: "Number of beds",
            href: "/",
            thumbnail:
              "https://images.pexels.com/photos/7195208/pexels-photo-7195208.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            count: v.bedrooms,
            color: "red",
            taxonomy: "category",
            listingType: "stay",
          },
          maxGuests: 0,
          bedrooms: v.bedrooms,
          bathrooms: v.bathrooms,
          saleOff: "-10% today",
          isAds: null,
          map: {
            lat: v.latitude,
            lng: v.longitude,
          },
        }));
        setListProperty(stayData);
        console.log("stProperty ", listProperty);
        // console.log("Fetched ", stayData);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    fetchStayListings();
  }, []);

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      {}
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {listProperty.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
