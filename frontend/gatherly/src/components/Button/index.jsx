import React from "react";
import PropTypes from "prop-types";

const shapes = {
  circle: "rounded-[50%]",
  square: "rounded-[0px]",
  round: "rounded-[14px]",
};
const variants = {
  fill: {
    white_A700: "bg-[#ffffff] text-[#1a1537]",
    pink_400: "bg-[#c8388e] shadow-[0_1px_3px_-1px_#0000004c] text-[#ffffff]",
    purple_50: "bg-[#ffe5ff]",
    blue_800: "bg-[#0051cb] text-[#ffffff]",
    purple_A100: "bg-[#f361e9] text-[#ffffff]",
    pink_600: "bg-[#de3151] shadow-[0_1px_2px_0_#1f293714]",
    blue_A200_19: "bg-[#4182f919]",
    white_A700_28: "bg-[#ffffff28] text-[#02011e]",
    gray_100_01: "bg-[#f7f7f7]",
    purple_500_33: "bg-[#af19a233] text-[#000000]",
    teal_A700: "bg-[#03ca8b] text-[#ffffff]",
    purple_500_02: "bg-[#ca1cbe] shadow-[0_10px_40px_0_#aeaeae33] text-[#ffffff]",
    white_A700_33: "bg-[#ffffff33] text-[#ffffff]",
    gray_50_01: "bg-[#fcfcfc]",
    gray_100: "bg-[#f3f4f6] text-[#000000]",
    red_600_33: "bg-[#ee382533] text-[#ef3826]",
  },
  gradient: {
    purple_100_pink_A200:
      "bg-gradient-to-b from-[#ffaaf2] to-[#ff21ad] shadow-[0_2px_4px_-1px_#00000011] text-[#ffffff]",
  },
  outline: {
    indigo_300: "border-[#598ec2] border border-solid text-[#598ec2]",
  },
};
const sizes = {
    "7xl": "h-[60px] px-[34px] text-[18px]",
    "5xl": "h-[52px] px-[34px] text-[20px]",
    "6xl": "h-[56px] px-4 text-[16px]",
    "3xl": "h-[48px] px-2.5",
    "9xl": "h-[70px]",
    "8xl": "h-[62px] px-1.5",
    lg: "h-[36px] px-1.5",
    "4xl": "h-[50px] px-[34px] text-[17px]",
    xs: "h-[24px] px-[34px] text-[10px]",
    xl: "h-[40px] px-[34px] text-[14px]",
    md: "h-[34px] px-4 text-[16px]",
    "2xl": "h-[46px] px-[18px] text-[14px]",
  };
  
  const Button = ({
    children,
    className = "",
    leftIcon,
    rightIcon,
    shape,
    variant = "outline",
    size = "sm",
    color = "indigo_300",
    ...restProps
  }) => {
    return (
      <button
        className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${
          shape && shapes[shape]
        } ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
        {...restProps}
      >
        {!!leftIcon && leftIcon}
        {children}
        {!!rightIcon && rightIcon}
      </button>
    );
  };
  
  Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    shape: PropTypes.oneOf(["circle", "square", "round"]),
    size: PropTypes.oneOf([
      "7xl",
      "5xl",
      "6xl",
      "3xl",
      "9xl",
      "8xl",
      "lg",
      "4xl",
      "xs",
      "xl",
      "md",
      "2xl",
      "sm",
    ]),
    variant: PropTypes.oneOf(["fill", "gradient", "outline"]),
    color: PropTypes.oneOf(["white_A700", "pink_400"]),
  };

  export { Button };