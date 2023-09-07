"use client";

import BackgroundSection from "@/components/BackgroundSection";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import {
  imageGallery as listingStayImageGallery,
  gethotelPhotos,
} from "./listing-stay-detail/[hotelId]/constant";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { imageGallery as listingExperienceImageGallery } from "./listing-experiences-detail/constant";
import { Route } from "next";
import { ListingGalleryImage } from "@/components/listing-image-gallery/utils/types";

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");
  const hotel_id = parseInt(searchParams?.get("hotel_id") as string);

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const getImageGalleryListing = async () => {
    if (thisPathname?.includes("/listing-stay-detail")) {
      const photos = await gethotelPhotos(hotel_id);
      return photos;
    }
    if (thisPathname?.includes("/listing-car-detail")) {
      return listingCarImageGallery;
    }
    if (thisPathname?.includes("/listing-experiences-detail")) {
      return listingExperienceImageGallery;
    }

    return [];
  };

  const [imageData, setImageData] = useState<ListingGalleryImage[]>();

  useEffect(() => {
    const fetchImageData = async () => {
      const data = await getImageGalleryListing();
      setImageData(data); // Set the result in the state
    };

    fetchImageData();
    console.log("setImagesData ", imageData), "hotel id", hotel_id;
  }, []);

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={imageData}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
        <SectionSubscribe2 className="pt-24 lg:pt-32" />
      </div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
