import { Heading, RatingBar, Button, Img } from "./..";
import React from "react";

export default function ConferenceRoomDetails1({
  roomName = "Salle amizoure",
  exploreButtonText = "Explore",
  locationName = "bejaia",
  ratingText = "4.6",
  capacityText = "Capacity",
  priceText = "Price",
  availabilityText = "Availability",
  ...props
}) {
  return (
    <div
      {...props}
      className={`$${props.className} flex flex-col w-[32%] md:w-full gap-[18px] md:px-5 bg-[#ffffff] shadow-[0_4px_40px_0_#00000014] rounded-[16px]`}
    >
      <div className="relative h-[204px] content-center self-stretch">
        <Img
          src="images/img_rectangle_14.png"
          alt="Salle Amizoure"
          className="h-[204px] w-full flex-1 object-cover"
        />
        <Button
          shape="square"
          className="absolute left-4 top-[17px] m-auto w-[30px]"
        >
          <Img src="images/defaultNoData.png" />
        </Button>
      </div>
      <div className="self-stretch mx-4 mb-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-1">
            <div className="flex self-stretch justify-between gap-5">
              <Heading
                size="heading2xl"
                as="h5"
                className="text-[22px] font-semibold !text-[#000000]"
              >
                {roomName}
              </Heading>
              <Button
                size="md"
                shape="round"
                className="min-w-[114px] self-end rounded-[16px] !border px-[27px] font-['Raleway'] font-semibold sm:px-5"
              >
                {exploreButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
