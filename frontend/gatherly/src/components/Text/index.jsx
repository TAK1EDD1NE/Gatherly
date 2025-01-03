import React from "react";

const sizes = {
  textxs: "text-[10px] font-normal",
  texts: "text-[11px] font-light",
  textxl: "text-[15px] font-normal",
  text2xl: "text-[16px] font-normal",
};

const Text = ({ children, className = "", as, size = "text2xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-[#000000] font-['Inter'] ${className} ${sizes[size]} `} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };