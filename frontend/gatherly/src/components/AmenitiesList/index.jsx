import { Text, Img } from "./..";
import React from "react";

export default function AmenitiesList({
  gardenViewIcon = "images/img_icon_1.svg",
  gardenViewTitle = "Garden view",
  wifiIcon = "images/img_icon_2.svg",
  wifiTitle = "Wifi",
  washerIcon = "images/img_eye.svg",
  washerTitle = "Free washer - in building",
  airConditioningIcon = "images/img_icon_3.svg",
  airConditioningTitle = "Central air conditioning",
  refrigeratorIcon = "images/img_icon_4.svg",
  refrigeratorTitle = "Refrigerator",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-[50%] md:w-full gap-4`}>
      <div className="flex items-center self-stretch gap-4">
        <Img src={gardenViewIcon} alt="Garden View" className="h-[32px]" />
        <Text as="p" className="text-[16px] font-normal">{gardenViewTitle}</Text>
      </div>
      <div className="flex items-center self-stretch gap-4">
        <Img src={wifiIcon} alt="Wifi" className="h-[32px]" />
        <Text as="p" className="text-[16px] font-normal">{wifiTitle}</Text>
      </div>
      <div className="flex items-center self-stretch gap-4">
        <Img src={washerIcon} alt="Image" className="h-[32px]" />
        <Text as="p" className="self-end text-[16px] font-normal">{washerTitle}</Text>
      </div>
      <div className="flex items-center self-stretch gap-4">
        <Img src={airConditioningIcon} alt="Image" className="h-[32px]" />
        <Text as="p" className="self-end text-[16px] font-normal">
        {airConditioningTitle}
        </Text>
        </div>
    <div className="flex items-center self-stretch gap-4">
        <Img src={refrigeratorIcon} alt="Refrigerator" className="h-[32px]" />
  <Text as="p" className="self-end text-[16px] font-normal">
    {refrigeratorTitle}
  </Text>
</div>
    </div>
  );
}
