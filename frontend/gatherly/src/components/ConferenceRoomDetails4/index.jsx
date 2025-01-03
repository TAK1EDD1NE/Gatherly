import { Heading, RatingBar, Img } from "./..";
import React from "react";

export default function ConferenceRoomDetails4({
  conferenceTitle = "Salle amizoure",
  exploreText = "Explore",
  locationText = "bejaia",
  ratingValue = "4.6",
  capacityText = "Capacity",
  priceText = "Price",
  availabilityText = "Availability",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col w-[32%] md:w-full gap-[18px] md:px-5 bg-[#ffffff] shadow-[0_4px_40px_0_#00000014] rounded-[16px]`}
    >
      <div className="relative h-[204px] content-center self-stretch">
        <Img src="images/img_rectangle_14.png" alt="Salle Amizoure" className="h-[204px] w-full flex-1 object-cover" />
        <Img src="images/img_group_239200.svg" alt="Image" className="absolute left-4 top-[17px] m-auto h-[30px]" />
      </div>
      <div className="mx-4 mb-16 flex flex-col gap-[30px] self-stretch">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-1">
            <div className="flex self-stretch justify-between gap-5">
              <Heading size="heading2xl" as="h5" className="text-[22px] font-semibold !text-[#000000]">
                {conferenceTitle}
              </Heading>
              <div className="flex w-[36%] justify-center self-end rounded-[16px] border border-solid border-[#598ec2] p-2">
                <Heading
                  size="headinglg"
                  as="h6"
                  className="!font-['Raleway'] text-[16px] font-semibold !text-[#598ec2]"
                >
                  {exploreText}
                </Heading>
              </div>
            </div>
            <Heading size="text3xl" as="p" className="text-[18px] font-medium !text-[#000000]">
              {locationText}
            </Heading>
          </div>
          <div className="flex items-center gap-3">
            <RatingBar value={4} isEditable={true} activeColor="#eac700" size={18} className="flex gap-2.5" />
            <Heading
              as="p"
              className="flex items-center justify-center rounded-[12px] bg-[#f361e9] px-4 py-0.5 text-[14px] font-semibold !text-[#eceff1]"
            >
              {ratingValue}
            </Heading>
          </div>
        </div>
        <div className="ml-[22px] mr-3.5 flex flex-wrap justify-between gap-5">
          <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
            {capacityText}
          </Heading>
          <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
            {priceText}
          </Heading>
          <Heading size="textmd" as="p" className="text-[13px] font-medium !text-[#90a4ae]">
            {availabilityText}
          </Heading>
        </div>
      </div>
    </div>
  );
}