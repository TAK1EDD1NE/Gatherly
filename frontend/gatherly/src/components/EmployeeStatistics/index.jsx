import { Img, Heading } from "./..";
import React from "react";

export default function EmployeeStatistics({
  totalEmployeeText = "Total Employee",
  employeeCounterText = "27", // Provide a default value
  genderText = "Are female", // Provide a default value
  employeeImage = "images/img_contrast.svg",
  percentageText = "40", // Added prop for percentage
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-start w-[24%] md:w-full gap-3.5 p-4 bg-[#ffffff] shadow-[6px_6px_54px_0_#0000000c] rounded-[14px]`}
    >
      <div className="flex flex-col items-start self-center flex-1 gap-6">
        <div className="flex flex-col items-start self-stretch gap-3">
          <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#202224b2]">
            {totalEmployeeText}
          </Heading>
          <Heading size="heading4xl" as="h3" className="text-[28px] font-bold tracking-[1.00px]">
            <span>{employeeCounterText}</span> {/* Use the prop here */}
            <span className="text-[20px]"> employee</span>
          </Heading>
        </div>
        <Heading size="headinglg" as="h6" className="text-[16px] font-semibold !text-[#00b69b]">
          <span className="text-[#00b69b]">{percentageText}</span> {/* Use the percentage prop */}
          <span className="text-[#00b69b]">%</span>
          <span className="text-[#12153c]">&nbsp;</span>
          <span className="text-[#606060]">{genderText}</span> {/* Use the gender prop */}
        </Heading>
      </div>
      <Img src={employeeImage} alt="Total Employee" className="h-[60px] w-[28%] object-contain" />
    </div>
  );
}