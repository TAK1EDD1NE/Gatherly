import React from "react";

const sizes = {
  texts: "text-[16px] font-medium",
  textmd: "text-[13px] font-medium",
  textlg: "text-[14px] font-medium",
  headingxs: "text-[10px] font-semibold",
  text3xl: "text-[18px] font-medium",
  text4xl: "text-[20px] font-medium",
  text5xl: "text-[22px] font-medium",
  text6xl: "text-[26px] font-medium md:text-[24px] sm:text-[22px]",
  text7xl: "text-[55px] font-medium md:text-[47px] sm:text-[41px]",
  text8xl: "text-[96px] font-medium md:text-[48px]",
  headings: "text-[12px] font-bold",
  headingmd: "text-[14px] font-semibold",
  headinglg: "text-[16px] font-semibold",
  headingxl: "text-[20px] font-semibold",
  heading2xl: "text-[22px] font-semibold",
  heading3xl: "text-[24px] font-semibold md:text-[22px]",
  heading4xl: "text-[28px] font-bold md:text-[26px] sm:text-[24px]",
  heading5xl: "text-[29px] font-bold md:text-[27px] sm:text-[25px]",
  heading6xl: "text-[30px] font-bold md:text-[28px] sm:text-[26px]",
  heading7xl: "text-[32px] font-bold md:text-[30px] sm:text-[28px]",
  heading8xl: "text-[36px] font-bold md:text-[34px] sm:text-[32px]",
  heading9xl: "text-[37px] font-black md:text-[35px] sm:text-[33px]",
  heading10xl: "text-[40px] font-bold md:text-[38px] sm:text-[36px]",
  heading11xl: "text-[50px] font-bold md:text-[46px] sm:text-[40px]",
};

const Heading = ({ children, className = "", size = "headingmd", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-[#202224] font-['Nunito_Sans'] ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };