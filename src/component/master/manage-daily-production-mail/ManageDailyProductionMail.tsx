'use client';

import React, { useState } from 'react';
import { Collapse, Form, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import {
  commonSorter,
  showFormattedDate,
} from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';

const ManageDailyProductionMail = () => {
  const filterData = useSelector((state: any) => state.filterData);

  const [dailyProductionId, setDailyProductionId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getQueryFetch } = useFetchData(
    service?.API_URL?.dailyProductionMail.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(
            filterOptiondata.dailyProductionMailFilter[0]
          )}
          url={service?.API_URL?.dailyProductionMail?.listing}
          exportUrl={service?.API_URL?.dailyProductionMail?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Planning Type',
      dataIndex: 'planningType',
      sorter: {
        compare: commonSorter('planningType'),
        multiple: 3,
      },
    },
    {
      title: 'Mails',
      dataIndex: 'mails',
      sorter: {
        compare: commonSorter('mails'),
        multiple: 3,
      },
    },
    {
      title: 'Planning Running',
      dataIndex: 'planningRunning',
      render: (_: any, record: any) => (
        <Form.Item name="status" className="form-item">
          <Switch checked={record.planningRunning} />
        </Form.Item>
      ),
    },
    {
      title: 'Plan Start Date',
      dataIndex: 'startDateTime',
      sorter: {
        compare: commonSorter('startDateTime'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>{showFormattedDate(record?.startDateTime)}</>
      ),
    },
    {
      title: 'Plan End Date',
      dataIndex: 'endDateTime',
      sorter: {
        compare: commonSorter('endDateTime'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record?.endDateTime)}</>,
    },

    {
      title: 'Plan Duration',
      dataIndex: 'planDuration',
      sorter: {
        compare: commonSorter('planDuration'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="DailyProductionMailLogs"
          idName="dmpLogId"
          idValue={record.dmpLogId}
          status={record.status}
          url={service?.API_URL?.dailyProductionMail?.listing}
        />
      ),
    },
  ];

  return (
    <div>
      <CommonHeader exportUrl={service.API_URL.dailyProductionMail.export} />
      {/* <CommonForm
        open={openAddModal}
        mdlTitle={dailyProductionId ? 'Edit Daily Production Mail' : 'Add Daily Production Mail'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InputBox
                label="Planning Type"
                name="planningType"
                required={true}
                inputPlaceholder="Planning Type"
                validateAsNumber={false}
                validateAsString={false}
                max={50}

              />

              <InputBox
                label="Mails"
                name="mails"
                required={true}
                inputPlaceholder="Mails"
                validateAsNumber={false}
                validateAsString={false}
                max={50}
              />

              <Form.Item
                label="Planning Running"
                name="planningRunning"
                className="form-item"
                rules={[{ required: false }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Datepicker
                label="Planning Start Date"
                name="startDateTime"
                required={true}
                showTime={false}
                format="DD-MMM-YYYY"
                placeholder="Select Date"
              />

              <Datepicker
                label="Planning End Date"
                name="endDateTime"
                className="date-picker"
                required={true}
                showTime={false}
                format="DD-MMM-YYYY"
                placeholder="Select Date"
              />

              <CommonSwitch
                label="Status"
                name="status"
                checkedChildren="Active"
                unCheckedChildren="InActive"
              />
            </div>
          </>
        }
      /> */}
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default ManageDailyProductionMail;
