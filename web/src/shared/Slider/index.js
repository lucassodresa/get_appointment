import React from 'react';
import { Slider as SliderAntd, Form } from 'antd';
import { Controller } from 'react-hook-form';

const Slider = ({
  name,
  label,
  placeholder,
  control,
  error,
  tooltip,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          label={label}
          hasFeedback
          tooltip={tooltip}
          validateStatus={
            (field.value || error) && (error ? 'error' : 'success')
          }
          help={error?.message}
        >
          <SliderAntd {...props} {...field} />
        </Form.Item>
      )}
    />
  );
};

export default Slider;
