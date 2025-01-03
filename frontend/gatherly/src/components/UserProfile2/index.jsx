import { Img, Heading } from "./..";
import React from "react";

export default function UserProfile2({ userName = "Name", ...props }) {
  return (
    <div {...props} className={`${props.className} flex items-center sm:w-full`}>
      <Heading as="p" className="text-[14px] font-bold">
        {userName}
      </Heading>
      <Img
        src="images/img_arrowdown_black_900_03_10x24.svg"
        alt="Name"
        className="ml-4 h-[24px]"
      />
      <div className="ml-6 h-[70px] w-px bg-[#979797af]" />
    </div>
  );
}