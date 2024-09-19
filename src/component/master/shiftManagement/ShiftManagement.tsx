'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Switch,
  Tag,
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
import {
  commonSorter,
  showFormattedTime,
} from '@/utils/functions/commonFunction';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ShiftManagement = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [shiftId, setShiftId] = useState<any>();

  const dispatch = useDispatch();
  const [breakData, setBreakData] = useState([]);
  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    
    getQueryFetch,
    listData,
    getListData,
  }: any = useFetchData(service?.API_URL?.shiftManagement?.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.shiftmasterFilter[0])}
          url={service?.API_URL?.shiftManagement?.listing}
          exportUrl={service?.API_URL?.shiftManagement.export}
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
      title: 'Shift Name',
      dataIndex: 'shiftName',
      sorter: {
        compare: commonSorter('shiftName'),
        multiple: 3,
      },
    },
    {
      title: 'HR Shift Code',
      dataIndex: 'hrShiftCode',
      sorter: {
        compare: commonSorter('hrShiftCode'),
        multiple: 3,
      },
    },
    {
      title: 'Breaks',
      dataIndex: 'breakName',
      sorter: {
        compare: commonSorter('breakName'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>
          {record?.shiftBreaks?.map((item: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {`${item?.breakName} ${showFormattedTime(
                  item?.breakFrom
                )} To ${showFormattedTime(item?.breakTo)}`}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Shift Start Time',
      dataIndex: 'startTime',
      sorter: {
        compare: commonSorter('startTime'),
        multiple: 3,
      },
    },
    {
      title: 'Shift End Time',
      dataIndex: 'endTime',
      sorter: {
        compare: commonSorter('endTime'),
        multiple: 3,
      },
    },
    {
      title: 'Shift Duration',
      dataIndex: 'shiftDuration',
      sorter: {
        compare: commonSorter('shiftDuration'),
        multiple: 3,
      },
    },
    {
      title: 'Shift Working Duration',
      dataIndex: 'workingDuration',
      sorter: {
        compare: commonSorter('workingDuration'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <SwitchComponent
          masterName="Shifts"
          idName="shiftId"
          idValue={record.shiftId}
          status={value}
          url={service?.API_URL?.shiftManagement?.listing}
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
            onClick={() => handleEdit(record.shiftId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.shiftId} deleteUrl={service?.API_URL?.shiftManagement?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      ...data,
      shiftId: shiftId || 0,
      isDelete: false,
      startTime: data.startTime ? data.startTime.format('HH:mm:ss') : '',
      endTime: data.endTime ? data.endTime.format('HH:mm:ss') : '',
      breakIds: data.breakIds.length > 0 ? data.breakIds : [],
    };
    if (shiftId) {
      const updateResData = await updateData(
        body,
        service?.API_URL?.shiftManagement.update
      );
      if (updateResData.apiStatus) {
        form.resetFields();
        setShiftId('');
      }
    } else {
      const addResData = await addData(
        body,
        service?.API_URL?.shiftManagement.add
      );
      if (addResData.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setShiftId(id);
      const queryParams = { shiftId: id };
      const apiUrl = service.API_URL.shiftManagement.getbyid;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        const data = editMachineRes[0];
        const formattedData = {
          ...data,
          breakIds: editMachineRes[0].shiftBreaks.map(
            (breaksItem: any) => breaksItem.breakMasterId
          ),
          startTime: editMachineRes[0].startTime
            ? dayjs(editMachineRes[0].startTime, 'HH:mm:ss')
            : null,
          endTime: editMachineRes[0].endTime
            ? dayjs(editMachineRes[0].endTime, 'HH:mm:ss')
            : null,
        };
        dispatch(openModal());
        form.setFieldsValue(formattedData);
        handleChangeUnit(editMachineRes[0].unitId);
      } else {
        // Handle the case where apiStatus is false
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    }
    // Perform your edit actions here
  };
  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      breakList: service?.API_URL?.breakWithShiftManagement?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setShiftId('');
    }
  }, [openAddModal]);
  const handleChangeUnit = async (id: any) => {
    const queryParams = { unitId: id };
    const unitbyBreakData: any = await getQueryFetch(
      queryParams,
      service.API_URL.breakWithShiftManagement.listing
    );
    if (unitbyBreakData?.length > 0) {
      setBreakData(formatBreakData(unitbyBreakData));
    }
  };
  const formatBreakData = (breakData: any) => {
    return breakData.map((breakItem: any) => ({
      ...breakItem,
      breakName: `${breakItem.breakName} (${breakItem.breakFrom} To ${breakItem.breakTo})`,
    }));
  };
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Shift"
        exportUrl={service.API_URL.breakWithShiftManagement.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={shiftId ? 'Edit Shift' : 'Add Shift'}
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
              handleMultiSelectChange={(value) => handleChangeUnit(value)}
              selectPlaceholder="Select Unit"
            />

            <InputBox
              label="Shift Name"
              name="shiftName"
              required
              inputPlaceholder="Shift Name"
              validateAsNumber={false}
              validateAsString={false}
              max={15}
            />

            <InputBox
              label="HR Shift Code"
              name="hrShiftCode"
              required
              inputPlaceholder="HR Shift Code"
              validateAsNumber={false}
              validateAsString={false}
              max={5}
            />

            <SelectBox
              label="Shift Type"
              name="shiftType"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: '1', label: 'Day' },
                { value: '2', label: 'Night' },
              ]}
              selectPlaceholder="Select Shift Type"
            />
            <SelectBox
              label="Break"
              name="breakIds"
              keyField="breakMasterId"
              valueField="breakName"
              mode
              required
              selectOptions={breakData}
              disabled={!(breakData.length > 0)}
              selectPlaceholder="Select Break"
            />
            <Form.Item
              label="Start Time"
              name="startTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker className="date-picker" />
            </Form.Item>

            <Form.Item
              label="End Time"
              name="endTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker className="date-picker" />
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

export default ShiftManagement;
