import React, { useEffect } from 'react';
import { DatePicker, Form, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const { RangePicker } = DatePicker;

interface DatepickerProps {
  label?: string;
  name: string;
  format?: string;
  showTime?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean; // Correct the type here
  handleChange?: any;
  onOk?: DatePickerProps['onOk'];
}

const Datepicker: React.FC<DatepickerProps> = ({
  label,
  name,
  format = 'YYYY-MM-DD HH:mm:ss',
  showTime,
  className = '',
  handleChange,
  placeholder,
  required,
  onOk,
}) => {
  return (
    <Space direction="vertical">
      <Form.Item
        label={label}
        name={name}
        rules={[{ required, message: 'This field is required' }]}
        className="form-item"
      >
        <DatePicker
          className="date-picker"
          format={format}
          placeholder={placeholder}
          showTime={showTime ? { format: 'HH:mm:ss' } : showTime}
          onChange={handleChange}
        />
      </Form.Item>
    </Space>
  );
};

export default Datepicker;
