import { Heading } from "./..";
import React from "react";

export default function UserProfileHeader({ userName = "Su", ...props }) {
  return (
    <div {...props} className={`${props.className} flex justify-center items-center w-full p-3.5`}>
      <Heading
        size="headings"
        as="p"
        className="!font-['Inter'] text-[12px] font-semibold !text-[#6b7280]"
      >
        {userName}
      </Heading>
    </div>
  );
}