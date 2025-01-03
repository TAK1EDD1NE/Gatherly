import React from "react";
import PropTypes from "prop-types";

const noOp = () => {};
const defaultList = [];

function ChipView(props) {
  const {
    options = defaultList,
    setOptions = noOp,
    values = defaultList,
    setValues = noOp,
    children,
    ...restProps
  } = props;

  const deleteOption = (value) => (event) => {
    event?.preventDefault();
    setOptions((options) =>
      options.filter((option) => option.value !== value)
    );
  };

  const toggle = (value) => (event) => {
    event?.preventDefault();
    setValues((values) => {
      const newValues = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return options
        .filter((option) => newValues.includes(option.value))
        .map((option) => option.value);
    });
  };

  React.useEffect(() => {
    setValues((values) => {
      if (
        values.every((value) =>
          options.find((option) => option.value === value)
        )
      ) {
        return values;
      }
      return options
        .filter((option) => values.includes(option.value))
        .map((option) => option.value);
    });
  }, [options, setValues]);

  return <div {...restProps}>{children}</div>;
}

ChipView.propTypes = {
  options: PropTypes.array,
  setOptions: PropTypes.func,
  values: PropTypes.array,
  setValues: PropTypes.func,
  children: PropTypes.node,
};

export default ChipView;
