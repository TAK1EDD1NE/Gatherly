import { Text, RatingBar, Img } from "./..";
import React from "react";

export default function ReserveAirbnbcomment({ ...props }) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-start w-full gap-[18px]`}>
      <div className="flex items-start self-stretch justify-center">
        <div className="flex w-[68%] items-center justify-center gap-6 self-center">
          <Img
            src="images/img_avatar_small_56x56.png"
            alt="Jose"
            className="h-[56px] w-[16%] rounded-[28px] object-contain"
          />
          <div className="flex flex-col items-start flex-1">
            <Text size="texts" as="p" className="text-[16px] font-medium">
              Jose
            </Text>
            <Text size="textxs" as="p" className="text-[14px] font-normal !text-[#6b7280]">
              December 2021
            </Text>
          </div>
        </div>
        <RatingBar
          value={1}
          isEditable={true}
          color="#fcd503"
          activeColor="#fcd503"
          size={22}
          starCount={4}
          className="mt-2.5 flex gap-2.5"
        />
      </div>
      <Text as="p" className="text-[16px] font-normal">
        Host was very attentive.
      </Text>
    </div>
  );
}