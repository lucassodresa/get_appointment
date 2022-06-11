import React from 'react';
import { TimePicker as TimePickerAntd, Form } from 'antd';
import { Controller } from 'react-hook-form';

const TimePicker = ({ name, label, placeholder, control, error, ...props }) => {
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
          help={error?.message}
        >
          <TimePickerAntd placeholder={placeholder} {...props} {...field} />
        </Form.Item>
      )}
    />
  );
};

export default TimePicker;
