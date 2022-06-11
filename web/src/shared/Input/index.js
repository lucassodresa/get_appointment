import { Form, Input as InputAntd, InputNumber } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  label,
  placeholder,
  control,
  error,
  tooltip,
  type = 'text',
  ...props
}) => {
  let InputElement;

  if (type === 'password') {
    InputElement = InputAntd.Password;
  } else if (type === 'textarea') {
    InputElement = InputAntd.TextArea;
  } else if (type === 'number') {
    InputElement = InputNumber;
  } else {
    InputElement = InputAntd;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          label={label}
          hasFeedback
          validateStatus={
            (field.value || error) && (error ? 'error' : 'success')
          }
          tooltip={tooltip}
          help={error?.message}
        >
          <InputElement placeholder={placeholder} {...props} {...field} />
        </Form.Item>
      )}
    />
  );
};

export default Input;
