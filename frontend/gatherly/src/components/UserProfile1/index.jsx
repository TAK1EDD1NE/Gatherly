import { Heading } from "./..";
import React from "react";

export default function UserProfile1({
  zipcode = "00002",
  userName = "Rosie Pearson",
  address = "979 Immanuel Ferry Suite 526",
  date = "28 May 2019",
  actionText = "Book",
  statusLabel = "Working",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex md:flex-col justify-center items-center self-stretch md:px-5 flex-1`}
    >
      <Heading as="p" className="self-start text-[14px] font-semibold !text-[#202224e5]">
        {zipcode}
      </Heading>
      <Heading as="p" className="ml-[102px] self-start text-[14px] font-semibold !text-[#202224e5] md:ml-0">
        {userName}
      </Heading>
      <div className="flex flex-1 flex-wrap justify-between gap-5 self-end px-[108px] md:self-stretch md:px-5">
        <Heading as="p" className="text-[14px] font-semibold !text-[#202224e5]">
          {address}
        </Heading>
        <Heading as="p" className="text-[14px] font-semibold !text-[#202224e5]">
          {date}
        </Heading>
      </div>
      <Heading as="p" className="self-start text-[14px] font-semibold !text-[#202224e5]">
        {actionText}
      </Heading>
      <div className="flex">
        <Heading
          size="headings"
          as="p"
          className="flex items-center justify-center rounded bg-[#e790ff33] px-[22px] py-1 text-[12px] font-bold !text-[#f361e9] sm:px-5"
        >
          {statusLabel}
        </Heading>
      </div>
    </div>
  );
}