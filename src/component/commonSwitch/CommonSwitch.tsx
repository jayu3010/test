import React from 'react';
import { Form, Space, Switch } from 'antd';

interface CommonSwitchProps {
  label: string;
  name: string;
  checkedChildren: string;
  unCheckedChildren: string;
  handleSwitchChange?: any;
  initialValue?: boolean;
}

const CommonSwitch: React.FC<CommonSwitchProps> = ({
  label,
  name,
  checkedChildren,
  unCheckedChildren,
  handleSwitchChange,
  initialValue = true,
}) => {
  console.log('JKKKKKKKKKKKKkk', initialValue);
  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName="checked"
      className="form-item"
      initialValue={initialValue}
    >
      <Switch
        defaultChecked
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        onChange={handleSwitchChange}
      />
    </Form.Item>
  );
};

export default CommonSwitch;
