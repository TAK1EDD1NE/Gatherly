import { Text } from "./..";
import React from "react";

export default function WeekDaysRow({
  dayOneText = "11",
  dayTwoText = "12",
  dayThreeText = "13",
  dayFourText = "14",
  dayFiveText = "15",
  daySixText = "16",
  daySevenText = "17",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center self-stretch flex-1`}>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {dayOneText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {dayTwoText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {dayThreeText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {dayFourText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {dayFiveText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {daySixText}
        </Text>
      </div>
      <div className="flex justify-center w-full p-3">
        <Text size="textxs" as="p" className="text-[14px] font-normal">
          {daySevenText}
        </Text>
      </div>
    </div>
  );
}