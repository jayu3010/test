import { Button, Form } from 'antd';
import React from 'react';

import SelectBox from '@/component/selectbox/selectbox';

const StatusChangeComponent = ({
  setStatusData,
  onStatusChange,
}: any) => {
  return (
    <div className="flex items-center deadline-status">
      <p>Change status for selected records</p>
      <Form.Item className="form-item">
        <SelectBox
          handleMultiSelectChange={(value: any) => setStatusData(value)}
          label=""
          name="status"
          keyField="value"
          valueField="label"
          mode={false}
          required
          selectOptions={[
            { value: 'Hold', label: 'Hold' },
            { value: 'Unhold', label: 'Unhold' },
            { value: 'Accepted', label: 'Accepted' },
            { value: 'Rejected', label: 'Rejected' },
          ]}
          selectPlaceholder="Select Status"
        />
      </Form.Item>
      <Button onClick={onStatusChange} className="history-btn">
        Submit
      </Button>
    </div>
  );
};

export default StatusChangeComponent;
