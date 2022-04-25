import { Form, Input as InputAntd } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const Input = ({ name, placeholder, control, error, type = 'text' }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          hasFeedback
          validateStatus={
            (field.value || error) && (error ? 'error' : 'success')
          }
          help={error?.message}
        >
          {type === 'password' ? (
            <InputAntd.Password placeholder={placeholder} {...field} />
          ) : (
            <InputAntd placeholder={placeholder} {...field} />
          )}
        </Form.Item>
      )}
    />
  );
};

export default Input;
