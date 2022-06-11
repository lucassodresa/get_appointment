import React from 'react';
import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import { Select as SelectAntd } from 'antd';

const Select = ({ children, name, label, placeholder, control, error }) => {
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
          <SelectAntd placeholder={placeholder} {...field}>
            {children}
          </SelectAntd>
        </Form.Item>
      )}
    />
  );
};

export default Select;
