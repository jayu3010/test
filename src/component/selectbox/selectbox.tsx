import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SelectProps } from 'antd/lib/select';

interface SelectBoxProps extends FormItemProps {
  selectOptions: SelectProps['options'];
  selectDefaultValue?: SelectProps['defaultValue'];
  selectPlaceholder?: SelectProps['placeholder'];
  keyField: string;
  valueField: string;
  required?: any;
  mode?: any;
  handleMultiSelectChange?: any;
  restWorkCenterField?: any;
  disabled?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  name,
  rules,
  selectOptions,
  selectDefaultValue,
  selectPlaceholder,
  keyField,
  valueField,
  mode,
  required,
  handleMultiSelectChange,
  restWorkCenterField,
  disabled,
  ...props
}) => {
  // Map the options to the required format
  const mappedOptions = selectOptions?.map((item) => ({
    value: item[keyField],
    label: item[valueField],
  }));

  return (
    <Form.Item
      {...restWorkCenterField}
      label={label}
      name={name}
      rules={[{ required, message: 'This field is required' }]}
      {...props}
      className="form-item"
    >
      <Select
        disabled={!!disabled}
        mode={mode && 'multiple'}
        className={mode ? 'form-multi-select' : ''}
        defaultValue={selectDefaultValue}
        placeholder={selectPlaceholder}
        options={mappedOptions}
        onChange={handleMultiSelectChange}
        value=""
        suffixIcon={null}
      />
    </Form.Item>
  );
};

export default SelectBox;
