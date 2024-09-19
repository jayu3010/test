import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';

interface InputBoxProps extends FormItemProps {
  inputDefaultValue?: InputProps['defaultValue']
  inputPlaceholder?: InputProps['placeholder']
  required?: boolean
  validateAsNumber?: boolean
  validateAsString?: boolean // Flag to control string-only validation
  disabled?: boolean
  restField?: any
  fieldKey?: any
  initialValue?: any
  props?: any
  value?: any,
  rules?: any // Custom rules passed by the user
  max?:Number;
  handleOnChange?:any
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  name,
  rules = [], // Default to an empty array
  inputDefaultValue,
  inputPlaceholder,
  required,
  validateAsNumber,
  validateAsString, // Flag to control string-only validation
  disabled,
  restField,
  initialValue,
  value,
  max,
  handleOnChange,
  ...props
}) => {
  const validationRules = [
    {
      required,
      message: 'This field is required',
    },
    validateAsString && {
      validator: (_: any, value: any) => {
        const isNumber = /\d/.test(value); // Check if the value contains any digit
        if (value && isNumber) {
          return Promise.reject(
            new Error('Only strings are allowed, no numbers.')
          );
        }
        return Promise.resolve();
      },
    },
    validateAsNumber && {
      validator: (_: any, value: any) => {
        const isNumber = /\d/.test(value); // Check if the value contains any digit
        const isNegative = /^-/.test(value);
        if (isNegative) {
          return Promise.reject(new Error('Only allowed valid number'));
        }
        return Promise.resolve();
      },
    },
    max && {
      validator: (_: any, value: any) => {
        // Only trigger the max error when the input exceeds the max length
        if (value && value.length > max) {
          return Promise.reject(new Error(`Maximum ${max} characters allowed`));
        }
        return Promise.resolve();
      },
    },
    ...rules, // Spread the user-defined rules here
  ].filter(Boolean); // Filter out undefined or false values
  

  return (
    <Form.Item
      {...restField}
      initialValue={initialValue||inputDefaultValue}
      label={label}
      name={name}
      rules={validationRules}
      className="form-item"
      {...props}
    >
      <Input
        value={value}
        defaultValue={inputDefaultValue}
        placeholder={inputPlaceholder}
        className="form-input"
        type={validateAsNumber ? 'number' : 'text'}
        disabled={disabled ? true : false}
        onChange={handleOnChange}

      />
    </Form.Item>
  );
};

export default InputBox;
