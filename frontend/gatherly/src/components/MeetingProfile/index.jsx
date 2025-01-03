import { Img, Heading } from "./..";
import React from "react";

export default function MeetingProfile({ meetingText = "Meeting with CEO", ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center self-stretch p-[30px] md:px-5 sm:p-5 border-[#d4d4d4] border-[0.6px] border-solid bg-[#fbfbfe] flex-1 rounded-[12px] container-xs`}
    >
      <div className="flex items-center flex-1 gap-6">
        <div className="h-[30px] w-[30px] rounded-md border-[0.6px] border-solid border-[#d4d4d4] bg-[#fbfbfe]" />
        <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#2d2d2d]">
          {meetingText}
        </Heading>
      </div>
      <Img src="images/img_close_gray_50_01.svg" alt="Meeting With" className="h-[30px]" />
    </div>
  );
}