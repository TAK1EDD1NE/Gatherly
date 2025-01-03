import { Text, Heading, Img } from "./..";
import React from "react";

export default function EventList1({
  eventTitleOne = "Event one",
  eventDescriptionOne = "partty or conference",
  eventTitleTwo = "Event two",
  eventDescriptionTwo = "partty or conference",
  newText = "new",
  eventTitleThree = "Event three",
  eventDescriptionThree = "partty or conference",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center self-stretch gap-[30px] flex-1`}>
      <div className="flex w-full items-center justify-center gap-[22px] rounded-[24px] bg-[#ffffff] p-6 sm:p-5">
        <div className="flex h-[70px] items-center bg-[url(/public/images/img_group_301.svg)] bg-cover bg-no-repeat p-5 md:h-auto">
          <Img src="images/img_clock.svg" alt="Event" className="h-[28px]" />
        </div>
        <div className="flex flex-col items-start flex-1 gap-1">
          <Heading size="headingxl" as="h5" className="!font-['Inter'] text-[20px] font-semibold !text-[#232323]">
            {eventTitleOne}
          </Heading>
          <Text as="p" className="text-[16px] font-normal !text-[#718ebf]">
            {eventDescriptionOne}
          </Text>
        </div>
      </div>
      <div className="flex flex-1 gap-[30px] md:flex-col md:self-stretch">
        <div className="w-full">
          <div className="relative h-[120px] rounded-[24px] bg-[#ffffff] px-3.5 py-4">
            <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 items-center justify-center gap-[22px] px-[38px] sm:px-5">
              <div className="flex h-[70px] items-center bg-[url(/public/images/img_group_301.svg)] bg-cover bg-no-repeat p-5 md:h-auto">
                <Img src="images/img_clock.svg" alt="Event" className="h-[28px]" />
              </div>
              <div className="flex flex-col items-start flex-1 gap-1">
                <Heading size="headingxl" as="h5" className="!font-['Inter'] text-[20px] font-semibold !text-[#232323]">
                  {eventTitleTwo}
                </Heading>
                <Text as="p" className="text-[16px] font-normal !text-[#718ebf]">
                  {eventDescriptionTwo}
                </Text>
              </div>
            </div>
            <Heading
              as="p"
              className="absolute right-[13.14px] top-[17.77px] m-auto flex items-center justify-center rounded-[12px] bg-[#03ca8b] px-3.5 py-0.5 text-[14px] font-semibold !text-[#ffffff]"
            >
              {newText}
            </Heading>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-[22px] rounded-[24px] bg-[#ffffff] p-6 sm:p-5">
          <div className="flex h-[70px] items-center bg-[url(/public/images/img_group_301.svg)] bg-cover bg-no-repeat p-5 md:h-auto">
            <Img src="images/img_clock.svg" alt="Event" className="h-[28px]" />
          </div>
          <div className="flex flex-col items-start flex-1 gap-1">
            <Heading size="headingxl" as="h5" className="!font-['Inter'] text-[20px] font-semibold !text-[#232323]">
              {eventTitleThree}
            </Heading>
            <Text as="p" className="text-[16px] font-normal !text-[#718ebf]">
              {eventDescriptionThree}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}