import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-lg",
};

const variants = {
  underline: {
    indigo_300_01: "text-[#4f4949] border-b border-[#7777b0] border-solid",
  },
  fill: {
    white_A700: "bg-[#ffffff] text-[#b0a9a9]",
    gray_50_02: "bg-[#f9f9f9] text-[#00000066]",
    gray_100_02: "bg-[#f5f6fa] text-[#2022247f]",
  },
};

const sizes = {
  sm: "h-[34px] px-3 text-[22px]",
  xs: "h-[14px] px-3 text-[11px]",
  xl: "h-[52px] px-[18px] text-[16px]",
  md: "h-[40px] px-2.5 text-[14px]",
  lg: "h-[50px] px-[18px] text-[13px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "lg",
      color = "white_A700",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`
          ${className} 
          flex items-center justify-center cursor-text  
          ${shape && shapes[shape]} 
          ${variant && (variants[variant]?.[color] || variants[variant])} 
          ${size && sizes[size]}
        `}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
        {!!suffix && suffix}
      </label>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["sm", "xs", "xl", "md", "lg"]),
  variant: PropTypes.oneOf(["underline", "fill"]),
  color: PropTypes.oneOf(["indigo_300_01", "white_A700", "gray_50_02", "gray_100_02"]),
};

export { Input };