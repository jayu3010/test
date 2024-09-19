'use client';

import React, { useState, useEffect } from 'react';
import { Button, Collapse, Form, Popconfirm, Switch, Tag, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import {
  commonSorter,
  showFormattedDate,
  showFormattedTime,
} from '@/utils/functions/commonFunction';
import ExportCSV from '@/component/exportCsv/ExportCSV';

const SchedulerController = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [palletId, setPalletId] = useState<any>();

  const [form] = Form.useForm();

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.palletmasterFilter[0])}
          url={service?.API_URL?.palletMaster?.listing}
          exportUrl={service?.API_URL?.palletMaster?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: {
        compare: commonSorter('unitName'),
        multiple: 3,
      },
    },
    {
      title: 'Schedule Frequency',
      dataIndex: 'Schedule Frequency',
      sorter: {
        compare: commonSorter('Schedule Frequency'),
        multiple: 3,
      },
    },
    {
      title: 'Basis of Scheduling',
      dataIndex: 'Basis of Scheduling',
      sorter: {
        compare: commonSorter('Schedule Frequency'),
        multiple: 3,
      },
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      sorter: {
        compare: commonSorter('description'),
        multiple: 3,
      },
    },

    {
      title: 'Start Date',
      dataIndex: 'startDate',
      sorter: {
        compare: commonSorter('startDate'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record?.startDate)}</>,
    },
    {
      title: 'Start Time',
      dataIndex: 'Start Time',
      sorter: {
        compare: commonSorter('Start Time'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedTime(record?.breakFrom)}</>,
    },
    {
      title: 'End Time',
      dataIndex: 'End Time',
      sorter: {
        compare: commonSorter('End Time'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedTime(record?.breakFrom)}</>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      sorter: {
        compare: commonSorter('endDate'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record?.endDate)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: any) => (
        <Form.Item name="status" className="form-item">
          <Switch checked={record.status} />
        </Form.Item>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <Popconfirm
            title="Sure to delete?"
            className="btn-outline"
          >
            <Button>{dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {};
  useEffect(() => {
    if (!openAddModal) {
      setPalletId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader addBtnTitle="Add  Pallet" />
      <CommonForm
        open={openAddModal}
        mdlTitle={palletId ? 'Edit Pallet' : 'Add Pallet'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Pallet Name"
              name="palletName"
              required
              inputPlaceholder="Pallet Name"
              validateAsNumber={false}
              validateAsString={false}
            />

            <SelectBox
              label="Pallet Count"
              name="palletCount"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '4', label: '4' },
                { value: '6', label: '6' },
              ]}
              selectPlaceholder="Pallet Count"
            />

            <CommonSwitch
              label="Status"
              name="status"
              checkedChildren="Active"
              unCheckedChildren="InActive"
            />
          </div>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default SchedulerController;
