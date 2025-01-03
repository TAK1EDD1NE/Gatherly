import React from "react";
import PropTypes from "prop-types";

const variants = {
  primary:
    "border-[#d5d5d5] border border-solid checked:border-[#d5d5d5] checked:border-[3px] checked:border-solid checked:bg-[#d5d5d5] checked:focus:bg-[#d5d5d5] checked:focus:border-[#d5d5d5] checked:hover:bg-[#d5d5d5] checked:hover:border-[#d5d5d5]",
};

const sizes = {
  xs: "h-[24px] w-[24px] rounded-[5px]",
};

const CheckBox = React.forwardRef(
  (
    {
      className = "",
      name = "",
      label = "",
      id = "checkbox_id",
      onChange,
      variant = "primary",
      size = "xs",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.checked);
    };

    return (
      <>
        <div
          className={
            className + " flex items-center gap-[5px] cursor-pointer"
          }
        >
          <input
            className={`${
              (size && sizes[size]) || ""
            } ${(variant && variants[variant]) || ""}`}
            ref={ref}
            type="checkbox"
            id={id}
            name={name}
            onChange={handleChange}
            {...restProps}
          />
          {label && <label htmlFor={id}>{label}</label>}
        </div>
      </>
    );
  }
);

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(["primary"]),
  size: PropTypes.oneOf(["xs"]),
};

export default CheckBox;
