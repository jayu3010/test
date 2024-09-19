'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Switch,
  TimePicker,
  Flex,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

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
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ShiftBreak = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [breakMasterId, setBreakMasterId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    
    listData,
    getQueryFetch,
    getListData,
  } = useFetchData(service?.API_URL?.breakWithShiftManagement.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.breakManagementFilter[0])}
          url={service?.API_URL?.breakWithShiftManagement?.listing}
          exportUrl={service?.API_URL?.breakWithShiftManagement?.export}
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
      title: 'Break Name',
      dataIndex: 'breakName',
      sorter: {
        compare: commonSorter('breakName'),
        multiple: 3,
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'breakFrom',
      sorter: {
        compare: commonSorter('breakFrom'),
        multiple: 3,
      },
    },
    {
      title: 'End Time',
      dataIndex: 'breakTo',
      sorter: {
        compare: commonSorter('breakTo'),
        multiple: 3,
      },
    },
    {
      title: 'Duration',
      dataIndex: 'breakDuration',
      sorter: {
        compare: commonSorter('breakDuration'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="BreakMasters"
          idName="breakMasterId"
          idValue={record.breakMasterId}
          status={record.status}
          url={service?.API_URL?.breakWithShiftManagement.listing}
        />
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
            onClick={() => handleEdit(record.breakMasterId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.breakMasterId} deleteUrl={service?.API_URL?.breakWithShiftManagement.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      ...data,
      breakMasterId: breakMasterId || 0,
      isDelete: false,
      breakFrom: data.breakFrom ? data.breakFrom.format('HH:mm:ss') : '',
      breakTo: data.breakTo ? data.breakTo.format('HH:mm:ss') : '',
    };
    if (breakMasterId) {
      const updateDateRes = await updateData(
        body,
        service?.API_URL?.breakWithShiftManagement?.update
      );
      if (updateDateRes?.apiStatus) {
        setBreakMasterId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.breakWithShiftManagement?.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setBreakMasterId(id);
      const queryParams = { breakMasterId: id };
      const apiUrl = service.API_URL.breakWithShiftManagement.getbyid;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const data = editMachineRes[0];
        const formattedData = {
          ...data,
          breakFrom: dayjs(editMachineRes[0].breakFrom, 'HH:mm:ss'),
          breakTo: dayjs(editMachineRes[0].breakTo, 'HH:mm:ss'),
        };

        form.setFieldsValue(formattedData);
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes);
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setBreakMasterId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Break"
        breadCum="Break Management"
        exportUrl={service.API_URL.breakWithShiftManagement.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={breakMasterId ? 'Edit Break' : 'Add Break'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SelectBox
              label="Unit Name"
              name="unitId"
              keyField="unitId"
              valueField="unitName"
              mode={false}
              required
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
            />

            <InputBox
              label="Break Name"
              name="breakName"
              required
              inputPlaceholder="Break Name"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <Form.Item
              label="Start Time"
              name="breakFrom"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker
                className="date-picker"
                name="breakFrom"
                format="HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
              label="End Time"
              name="breakTo"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker className="date-picker" format="HH:mm:ss" />
            </Form.Item>

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

export default ShiftBreak;
