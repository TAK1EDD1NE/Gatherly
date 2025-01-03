import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-lg",
};

const variants = {
  tarOutlineBluegray10002: "!border-[#d2d6da] border border-solid bg-[#ffffff]",
  tarOutlineBlack90016: "bg-[#f7f7f7] shadow-[3px_5px_50px_2px_#00000016]",
};

const sizes = {
  xs: "h-[150px] p-3 text-[14px]",
  sm: "h-[192px] p-3 text-[14px]",
};

const TextArea = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      shape,
      size = "xs",
      variant = "tarOutlineBluegray10002",
      onChange,
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <textarea
        ref={ref}
        className={`${className} ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]}`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  }
);

TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["tarOutlineBluegray10002", "tarOutlineBlack90016"]),
};

export { TextArea };