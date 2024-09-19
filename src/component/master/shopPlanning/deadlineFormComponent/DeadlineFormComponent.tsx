'use client';

import { Button, DatePicker, Flex, Form, Space } from 'antd';
import React from 'react';

const DeadlineFormComponent = () => {
  return (
    <div className="deadline-content flex items-center gap-3">
    <div className="special-date flex">
      <Form.Item label="" name="startDate" className="form-item">
        <DatePicker
          className="date-picker"
          placeholder="Start Date"
          format="DD-MMM-YYYY"
        // defaultValue={dayjs('', dateFormat)}
        />
      </Form.Item>
      <div className="relative">TO</div>
      <Form.Item
        name="endDate"
        className="form-item end-date"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <DatePicker
          format="DD-MMM-YYYY"
          className="date-picker"
          placeholder="End Date"
        />
      </Form.Item>
    </div>
    <div className="deadline-btn flex items-center flex-wrap">
      <Flex gap={15} className="action-icon mr-4">
        <Button className="btn-green">Under Deadline</Button>
        <Button className="btn-danger">Over Deadline</Button>
      </Flex>
      <Space>
        <span className="block"></span>
      </Space>
      <Flex gap={15} className="action-icon ml-4">
        <Button className="btn-green">Under Load</Button>
        <Button className="btn-danger">Over Load</Button>
      </Flex>
    </div>
  </div>
  );
};

export default DeadlineFormComponent;
