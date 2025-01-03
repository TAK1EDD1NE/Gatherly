import { Text, Heading, Img } from "./..";
import React from "react";

export default function UserProfile({
  userName = "Bouabca chamseddine",
  userDescription = "dwesigner and ui ux and also have big kniowledge in dev ops and backend ",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex sm:flex-col items-start w-full gap-4 p-3 bg-[#ffffff] shadow-[0_20px_27px_0_#0000000c] rounded-[16px]`}
    >
      <Img
        src="images/img_image_150x140.png"
        alt="Bouabca"
        className="h-[150px] w-[32%] self-center rounded-lg object-contain"
      />
      <div className="mt-[26px] flex flex-1 flex-col items-start gap-7 sm:self-stretch">
        <Heading
          size="headingxl"
          as="h5"
          className="!font-['Open_Sans'] text-[20px] font-semibold !text-[#252f40]"
        >
          {userName}
        </Heading>
        <Text
          as="p"
          className="w-[98%] !font-['Open_Sans'] text-[16px] font-normal leading-[26px] !text-[#67748e]"
        >
          {userDescription}
        </Text>
      </div>
    </div>
  );
}