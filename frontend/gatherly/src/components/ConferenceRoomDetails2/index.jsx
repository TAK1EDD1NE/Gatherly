import { Heading, RatingBar, Button, Img } from "./..";
import React from "react";

export default function ConferenceRoomDetails2({
  roomName = "Salle amizoure",
  exploreButtonText = "Explore",
  location = "bejaia",
  ratingText = "4.6",
  capacityLabel = "Capacity",
  capacityValue = "30-50 people",
  priceLabel = "Price",
  priceValue = "123000DA",
  availabilityLabel = "Availability",
  availabilityValue = "Yes",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col w-[32%] md:w-full gap-2 bg-[#ffffff] shadow-[0_4px_40px_0_#00000014] rounded-[16px]`}
    >
      <div className="relative h-[204px] content-center self-stretch">
        <Img src="images/img_rectangle_14.png" alt="Salle Amizoure" className="h-[204px] w-full flex-1 object-cover" />
        <Button shape="square" className="absolute left-4 top-[17px] m-auto w-[30px]">
          <Img src="images/defaultNoData.png" />
        </Button>
      </div>
      <div className="flex flex-col gap-[30px] self-stretch p-2.5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-1">
            <div className="flex self-stretch justify-between gap-5">
              <Heading size="heading2xl" as="h5" className="text-[22px] font-semibold !text-[#000000]">
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
            <Heading size="text3xl" as="p" className="text-[18px] font-medium !text-[#000000]">
              {location}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
            <RatingBar value={4} isEditable={true} activeColor="#eac700" size={18} className="flex gap-2.5" />
            <Heading
              as="p"
              className="flex items-center justify-center rounded-[12px] bg-[#f361e9] px-4 py-0.5 text-[14px] font-semibold !text-[#eceff1]"
            >
              {ratingText}
            </Heading>
          </div>
        </div>
        <div className="mb-5 flex gap-3.5">
          <div className="flex w-full flex-col items-center gap-2.5">
            <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
              {capacityLabel}
            </Heading>
            <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#607d8a]">
              {capacityValue}
            </Heading>
          </div>
          <div className="flex w-full flex-col items-center gap-2.5 px-1.5">
            <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
              {priceLabel}
            </Heading>
            <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#607d8a]">
              {priceValue}
            </Heading>
          </div>
          <div className="flex w-full flex-col items-center gap-2.5 px-3.5">
            <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
              {availabilityLabel}
            </Heading>
            <div className="flex w-[62%] items-center justify-center gap-1.5">
              <div className="h-[8px] w-[8px] rounded bg-[#f361e9]" />
              <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#607d8a]">
                {availabilityValue}
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
