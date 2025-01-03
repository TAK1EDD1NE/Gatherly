import { Button, Img, Heading } from "./..";
import React from "react";

export default function MeetingRow({ meetingText = "Meeting with CEO", ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center self-stretch p-[30px] md:px-5 sm:p-5 flex-1 cursor-pointer container-xs hover:shadow-[10px_8px_20px_0_#2d062f66]`}
    >
      <div className="flex items-center flex-1 gap-6">
        <div className="h-[30px] w-[30px] rounded-md border-[0.6px] border-solid border-[#d4d4d4] bg-[#fbfbfe]" />
        <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#2d2d2d]">
          {meetingText}
        </Heading>
      </div>
      <Button
        color="gray_50_01"
        variant="fill"
        shape="round"
        className="w-[30px] rounded-[14px] border-[0.2px] border-solid border-[#888888] px-2.5"
      >
        <Img src="images/img_close_blue_gray_400_01.svg" />
      </Button>
    </div>
  );
}