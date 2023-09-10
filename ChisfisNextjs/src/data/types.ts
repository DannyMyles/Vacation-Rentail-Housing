import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string>;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface PropertyList {
  arrival_date: string;
  departure_date: string;
  room_qty: string;
  guest_qty: string;
  bbox: string;
  search_id: string;
  children_age: string;
  price_filter_currencycode: string;
  categories_filter: string;
  languagecode: string;
  travel_purpose: string;
  children_qty: string;
  order_by: string;
}

export interface CardDataType {
  id: string;
  main_photo_url: string;
  hotel_name: string;
  address: string;
  review_score: number;
  review_nr: number;
  main_total_price: number;
}

export interface HotelPhotos {
  data: {
    [key: string]: HomepageDetails[];
  };
}
export interface HotelDetails {
  data: HotelDetail;
}

export interface HotelDetail {
  hotel_name: string;
  address: string;
  description: string;
  country_trans: string;
  city_trans: string;
  rooms: {
    [k: string]: any,
  }
}

export interface Facility {
    alt_facilitytype_name: string;
    name: string;
    facilitytype_id: number;
    id: number;
    alt_facilitytype_id: number;
    facilitytype_name: string;
  };

export interface HomepageDetails {
  "0": number;
  "1": {
    confidence: number;
    photo_id: number;
    tag_id: number;
    tag_name: null | string;
    tag_type: string;
  }[];
  "2": number;
  "3": { tag: String; id: number }[];
  "4": string;
  "5": string;
  "6": string;
  "7": string;
}
