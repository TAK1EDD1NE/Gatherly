import { Button, Heading } from "./..";
import React from "react";

export default function Header({ ...props }) {
  return (
    <header {...props} className={`${props.className} flex justify-between items-center gap-5`}>
      <div className="flex w-[5%] justify-center self-end rounded-[14px] bg-[#ffffff] sm:w-full">
        <Heading
          size="headingxl"
          as="h5"
          className="self-end !font-['Montserrat'] text-[20px] font-semibold !text-[#000000]"
        >
          logo
        </Heading>
      </div>
      <div className="mr-[68px] flex w-[40%] items-start justify-between gap-5 sm:mr-0 sm:w-full sm:flex-col">
        <ul className="!mt-1.5 flex flex-wrap gap-8">
          <li>
            <a href="#">
              <Heading size="textlg" as="p" className="!font-['Manrope'] text-[14px] font-medium !text-[#ffffff]">
                Home
              </Heading>
            </a>
          </li>
          <li>
            <a href="#">
              <Heading size="textlg" as="p" className="!font-['Manrope'] text-[14px] font-medium !text-[#ffffff]">
                Hall Expo
              </Heading>
            </a>
          </li>
          <li>
            <a href="#">
              <Heading size="textlg" as="p" className="!font-['Manrope'] text-[14px] font-medium !text-[#ffffff]">
                About Us
              </Heading>
            </a>
          </li>
          <li>
            <a href="#">
              <Heading size="textlg" as="p" className="!font-['Manrope'] text-[14px] font-medium !text-[#ffffff]">
                Sign In
              </Heading>
            </a>
          </li>
        </ul>
        <Button
          color="white_A700_33"
          size="xl"
          variant="fill"
          className="min-w-[120px] self-center rounded-[20px] px-[34px] font-['Manrope'] font-medium sm:px-5"
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}