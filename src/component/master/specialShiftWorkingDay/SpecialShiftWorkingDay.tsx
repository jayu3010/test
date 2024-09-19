'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Switch,
  Tag,
  Flex,
  DatePicker,
  TimePicker,
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
import {
  commonSorter,
  showFormattedDate,
  showFormattedTime,
} from '@/utils/functions/commonFunction';
import InputBox from '@/component/input/Input';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';

const SpecialShiftWorkingDay = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [breakData, setBreakData] = useState([]);

  const [specialDayId, setSpecialDayId] = useState<any>();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    getListData,
    
    getQueryFetch,
    listData,
  }: any = useFetchData(service.API_URL.additionalShift.listing);

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
      title: 'Work Center Name',
      dataIndex: 'workCenterName',
      render: (value: any, record: any) => (
        <>
          {record?.workCenters?.map((item: any, index: any) => {
            return (
              <Tag color="#6D72EA" key={index}>
                {item.workCenterName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Special Day Name',
      dataIndex: 'shiftName',
      sorter: {
        compare: commonSorter('shiftName'),
        multiple: 3,
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      sorter: {
        compare: commonSorter('reason'),
        multiple: 3,
      },
    },

    {
      title: 'Start Date',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <>{showFormattedDate(record.startDate)}</>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <>{showFormattedDate(record.endDate)}</>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <>{showFormattedTime(record.startTime)}</>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <>{showFormattedTime(record.endTime)}</>
      ),
    },
    {
      title: 'Total Days',
      dataIndex: 'totalDays',
      sorter: {
        compare: commonSorter('totalDays'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <SwitchComponent
          masterName="shiftSpecialWorkingDays"
          idName="additionalShiftId"
          idValue={record.additionalShiftId}
          status={value}
          url={service?.API_URL?.additionalShift?.listing}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (value: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.additionalShiftId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.additionalShiftId} deleteUrl={service?.API_URL?.additionalShift?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    try {
      const body = {
        additionalShiftId: specialDayId || 0,
        ...data,
        startDate: data.startDate ? data.startDate.format('YYYY-MM-DD') : '',
        endDate: data.endDate ? data.endDate.format('YYYY-MM-DD') : '',
        startTime: data.startTime ? data.startTime.format('HH:mm:ss') : '',
        endTime: data.endTime ? data.endTime.format('HH:mm:ss') : '',
        isDelete: false,
      };
      if (specialDayId) {
        const updateDataRes = await updateData(
          body,
          service.API_URL.additionalShift.update
        );
        if (updateDataRes?.apiStatus) {
          setSpecialDayId('');
          form.resetFields();
        }
      } else {
        const addDataRes = await addData(
          body,
          service.API_URL.additionalShift.add
        );
        if (addDataRes?.apiStatus) {
          form.resetFields();
        }
      }
    } catch (error) {
      console.error('Error occurred while submitting the form:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleEdit = async (id: any) => {
    try {
      setSpecialDayId(id);
      const queryParams = { additionalShiftId: id };
      const apiUrl = service.API_URL.additionalShift.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const dataWithMomentDates = {
          ...editMachineRes[0],
          startDate: dayjs(editMachineRes[0].startDate, 'YYYY-MM-DD'),
          endDate: dayjs(editMachineRes[0].endDate, 'YYYY-MM-DD'),
          startTime: dayjs(editMachineRes[0].startTime, 'HH:mm:ss'),
          endTime: dayjs(editMachineRes[0].endTime, 'HH:mm:ss'),
        };
        form.setFieldsValue(dataWithMomentDates);
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
      workCenter: service?.API_URL?.manageworkcenter?.listing,
    };
    const enable = !!specialDayId;
    await getListData(apiUrls, enable);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setSpecialDayId('');
      // setHolidayArray([]);
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
      breakName: `${breakItem.breakName} (${breakItem.breakFrom} - ${breakItem.breakTo})`,
    }));
  };
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.specialWorkingFilter[0])}
          url={service.API_URL.additionalShift?.listing}
        />
      ),
    },
  ];

  return (
    <div>
      <CommonHeader addBtnTitle="Add Special Shift Working Day" />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          specialDayId
            ? 'Edit Special Shift Working Day'
            : 'Add Special Shift Working Day'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Special Shift Day"
              name="shiftName"
              required
              inputPlaceholder="Special Shift Day"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />
            <SelectBox
              label="Unit Name"
              name="unitId"
              keyField="unitId"
              valueField="unitName"
              mode={false}
              required
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
              handleMultiSelectChange={(value) => handleChangeUnit(value)}
            />

            <SelectBox
              label="Work Center"
              name="workCenter"
              keyField="workCenterId"
              valueField="workCenterName"
              mode
              required
              selectOptions={listData?.workCenter}
              selectPlaceholder="Select Work Center"
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
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: 'This field is required' }]}
              className="form-item"
            >
              <DatePicker
                className="date-picker"
                format="DD-MMM-YYYY"
                name="startDate"
              />
            </Form.Item>

            <Form.Item
              label="Start Time"
              name="startTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker className="date-picker" name="startTime" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <DatePicker
                className="date-picker"
                format="DD-MMM-YYYY"
                name="endDate"
              />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker className="date-picker" name="endTime" />
            </Form.Item>
            <InputBox
              label="Reasons"
              name="reason"
              required
              inputPlaceholder="Reasons"
              validateAsNumber={false}
              validateAsString={false}
              max={5}
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

export default SpecialShiftWorkingDay;
