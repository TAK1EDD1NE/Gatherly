import { Text, Img } from "./..";
import React from "react";

export default function LocationProfile({
  locationImage = "images/img_icon_black_900_03.svg",
  locationTitle = "location",
  locationSubtitle = "amizour bejaia",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center self-stretch flex-1`}>
      <div className="flex items-start w-full gap-4">
        <Img src={locationImage} alt="Location" className="h-[32px]" />
        <div className="flex flex-1 flex-col items-start gap-0.5 self-center">
          <Text size="texts" as="p" className="text-[16px] font-medium">
            {locationTitle}
          </Text>
          <Text size="textxs" as="p" className="text-[14px] font-normal !text-[#6b7280]">
            {locationSubtitle}
          </Text>
        </div>
      </div>
    </div>
  );
}