import { Heading, Img } from "./..";
import React from "react";

export default function UserProfile3({
  userImage = "images/img_ellipse_7.png",
  userName = "Bessie Cooper",
  userTime = "01:55 pm",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center self-stretch gap-3 py-2 flex-1`}
    >
      <Img
        src={userImage}
        alt="Bessie Cooper"
        className="h-[48px] rounded-[24px] object-cover"
      />
      <div className="flex flex-col items-start justify-center flex-1 gap-1">
        <Heading
          size="headinglg"
          as="h6"
          className="!font-['Inter'] text-[16px] font-semibold !text-[#485056]"
        >
          {userName}
        </Heading>
        <Heading
          size="textlg"
          as="p"
          className="!font-['Inter'] text-[14px] font-normal !text-[#7d8b93]"
        >
          {userTime}
        </Heading>
      </div>
    </div>
  );
}