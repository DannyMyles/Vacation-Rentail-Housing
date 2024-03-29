"use client";

import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState, MouseEvent, useEffect } from "react";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import ModalSelectDate from "@/components/ModalSelectDate";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Image from "next/image";
import { GuestsObject } from "../(client-components)/type";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const getCardToken = async (
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string
  ) => {
    const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    const token = await stripe.tokens.create({
      card: {
        number: "4242424242424242", //cardNumber, //"4242424242424242",
        exp_month: 9, //expMonth, //9,
        exp_year: 2024, //expYear, //2024,
        cvc: 314, //cvc, //"314",
      },
    });
    return token;
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("guests params ", searchParams.get("guests"));
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(searchParams.get("checkIn") as string)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(searchParams.get("checkOut") as string)
  );

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: parseInt(searchParams.get("guestAdults") as string),
    guestChildren: parseInt(searchParams.get("guestChildren") as string),
    guestInfants: parseInt(searchParams.get("guestInfants") as string),
  });

  const [amountPerNight, setAmountPerNight] = useState(
    parseInt(searchParams.get("amount") as string)
  );
  console.log("amountPerNight", amountPerNight);

  const [numberOfNights, setNumberOfNights] = useState(
    (new Date(searchParams.get("checkOut") as string).getTime() -
      new Date(searchParams.get("checkIn") as string).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  // payment inputs
  const [paymentValues, setpaymentValues] = useState({
    cardNumber: "",
    email: "",
    cardHolder: "",
    expiryDate: new Date(),
    cardCvc: "",
    message: "",
    password: "",
  });

  const paymentAmount =
    guests.guestAdults && guests.guestChildren && guests.guestInfants
      ? (guests?.guestAdults + guests?.guestChildren + guests?.guestInfants) *
        (amountPerNight * numberOfNights)
      : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpaymentValues({ ...paymentValues, [name]: value });
  };
  const handlePayment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const expMonth = new Date(paymentValues.expiryDate).getMonth();
    const expYear = new Date(paymentValues.expiryDate).getFullYear();
    console.log("tokenize payment", paymentValues);
    const baseUrl = "https://utotel.herokuapp.com/v1";
    const authRegBody = {
      email: "bkiragu27@gmail.com", //paymentValues.email, //"bkiragu27@gmail.com",
      password: "12345678", // paymentValues.password, //"12345678",
      method: "custom_email",
    };

    // Get auth token
    const res = await axios.post(`${baseUrl}/auth/login`, authRegBody);
    console.log("login res", res.data);

    // create payment
    const token = await getCardToken(
      paymentValues.cardNumber,
      expMonth,
      expYear,
      paymentValues.cardCvc
    );

    console.log("card token", token);

    // make payment
    const paymentbody = {
      amount: paymentAmount,
      paymentMethod: token.id,
      booking_id: "645340459541754e8810516a",
      userId: "cus_OT9quJQQO8lCis",
      email: "bkiragu27@gmail.com",
    };

    const paymentRes = await axios.post(
      `${baseUrl}/payment/create-payment-intent`,
      paymentbody,
      {
        headers: {
          Authorization: `Bearer ${res.data.data.token}`,
        },
      }
    );

    // will not go to production
    alert(JSON.stringify(paymentRes, null, 4));
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Hotel room in Tokyo, Jappan
              </span>
              <span className="text-base font-medium mt-1 block">
                The Lounge & Bar
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              ${amountPerNight?.toFixed()} x {numberOfNights} night(s)
            </span>
            <span>{amountPerNight && amountPerNight * numberOfNights}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${paymentAmount}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {`${
                          (guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                        } Guests, ${guests.guestInfants || 0} Infants`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <Image className="w-8" src={visaPng} alt="visa" />
                      <Image
                        className="w-8"
                        src={mastercardPng}
                        alt="mastercard"
                      />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input
                      onChange={handleChange}
                      name="cardNumber"
                      defaultValue="235-4643-565"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input
                      defaultValue="JOHN DOE"
                      onChange={handleChange}
                      name="cardHolder"
                    />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input
                        type="date"
                        defaultValue="MM/YY"
                        onChange={handleChange}
                        name="expiryDate"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input onChange={handleChange} name="cardCvc" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea
                      placeholder="..."
                      onChange={handleChange}
                      name="message"
                    />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" onChange={handleChange} name="email" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input
                      type="password"
                      defaultValue="***"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={"/pay-done"} onClick={handlePayment}>
                Confirm and pay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
