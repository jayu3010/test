'use client'

import React, { useState, useEffect } from 'react'

import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Switch,
  Tag,
  Flex,
  DatePicker,
  Table,
  TimePicker,
} from 'antd'
import CommonForm from '@/app/layout/commonForm/commonForm'
import Filter from '@/app/layout/filter/filter'
import CommonHeader from '@/component/commonHeader/CommonHeader'
import TableComponent from '@/component/tableComponent/TableComponent'
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData'

import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form'

import SelectBox from '@/component/selectbox/selectbox';
import { addOpenModal, openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, searchIcon, timeIcon } from '@/utils/icons/icons';
import {
  commonSorter,
  showFormattedDate,
  showFormattedTime,
} from '@/utils/functions/commonFunction';
import InputBox from '@/component/input/Input';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData'

import dayjs from 'dayjs'

import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent'
import EditSpecialWorkingDay from './EditSpecialWorkingDay'
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const SpecialWorkingDay = () => {
  const dateFormat = 'MM-YYYY';
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [specialDayId, setSpecialDayId] = useState<any>();
  const [holidayArray, setHolidayArray] = useState([]);
  const [originalHolidayArray, setOriginalHolidayArray] = useState([]);
  const [startDates, setStartDate] = useState({ startDate: null, dayName: '' });
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, getListData,  getQueryFetch, listData }: any =
    useFetchData(service?.API_URL?.specialWorking?.listing);

  const holidayweekoff = [
    {
      id: 'all',
      text: 'All',
    },
    {
      id: 'holiday',
      text: 'Holiday',
    },
    {
      id: 'Weekoff',
      text: 'Weekly Off',
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
      title: 'Special Day Name',
      dataIndex: 'dayName',
      sorter: {
        compare: commonSorter('dayName'),
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
      title: 'Work Center Name',
      dataIndex: 'workCenterName',
      render: (_, record: any) => (
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
      title: 'Start Time',
      dataIndex: 'startTime',
      render: (_, record: any) => <>{showFormattedTime(record.startTime)}</>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      render: (_, record: any) => <>{showFormattedTime(record.endTime)}</>,
    },
    {
      title: 'Total Hours',
      dataIndex: 'totalHours',
      sorter: {
        compare: commonSorter('totalHours'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedTime(record.totalHours)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="SpecialWorkingDays"
            idName="specialWorkingDayId"
            idValue={record.specialWorkingDayId}
            status={record.status}
            url={service?.API_URL?.specialWorking?.listing}
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
              onClick={() => handleEdit(record.specialWorkingDayId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.specialWorkingDayId} deleteUrl={service?.API_URL?.specialWorking?.listing} />

          </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    delete data.holidayweekoff;
    delete data.startDate;
    delete data.endDate;
    const body = {
      specialWorkingDayId: 0,
      ...data,
      holidayDate: startDates.startDate,
      dayName: startDates?.dayName,
      startTime: data?.startTime ? data?.startTime?.format('HH:mm:ss') : '',
      endTime: data?.endTime ? data?.endTime?.format('HH:mm:ss') : '',
      isDelete: false,
    };
    const addDataRes = await addData(
      body,
      service?.API_URL?.specialWorking.add
    );
    if (addDataRes.apiStatus) {
      form.resetFields();
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setSpecialDayId(id);
      dispatch(addOpenModal('editSpecialDay'));
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    }
  };
  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      workCenter: service?.API_URL?.manageworkcenter?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setSpecialDayId('');
      setHolidayArray([]);
      // setHolidayArray([]);
    }
  }, [openAddModal]);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.specialWorkingFilter[0])}
          url={service?.API_URL?.specialWorking?.listing}
          exportUrl={service?.API_URL?.specialWorking?.export}
        />
      ),
    },
  ];

  const column = [
    {
      title: 'Date',
      dataIndex: 'startDate',
      key: 'date',
      render: (_, record: any) => <>{showFormattedDate(record?.startDate)}</>,
    },
    {
      title: 'Description',
      dataIndex: 'dayName',
      key: 'dayName',
    },
    {
      title: 'Work Center',
      dataIndex: 'workCenter',
      key: 'workCenter',
      render: (_, record: any) => (
        <>
          {record?.workCenter?.map((workItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {workItem?.workCenterName}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const onRowClick = (record: any, index: any) => {
    setSelectedRowKey(index);
    setStartDate({
      ...startDates,
      startDate: record?.startDate,
      dayName: record?.dayName,
    });
  };

  const handleClickDate = async () => {
    const startDate = dayjs(form.getFieldValue('startDate')).format('MM-YYYY');
    const endDate = dayjs(form.getFieldValue('endDate')).format('MM-YYYY');
    const unitId = form.getFieldValue('unitId') || '';
    if (unitId) {
      setOriginalHolidayArray([]);
      const queryParams = {
        startMonth: startDate,
        endMonth: endDate,
        unitId,
      };
      const apiUrl = service.API_URL.specialWorking.search;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      console.log('🚀 ~ handleClickDate ~ editMachineRes:', editMachineRes);
      if (editMachineRes?.length > 0) {
        setOriginalHolidayArray(editMachineRes);
        setHolidayArray(editMachineRes);
      }
    }
  };

  const handleMultiSelectChange = (value: any) => {
    try {
      let filteredArray: any = [];
      if (value === 'Weekoff') {
        filteredArray = originalHolidayArray.filter(
          (item: any) => item.dayName === 'Weekoff'
        );
        console.log('1', filteredArray);

      } else if (value === 'holiday') {
        filteredArray = originalHolidayArray.filter(
          (item: any) => item?.dayName !== 'Weekoff'
        );
      } else if (value === 'all') {
        filteredArray = originalHolidayArray;
      } else {
        filteredArray = originalHolidayArray;
      }
      setHolidayArray(filteredArray);
    } catch (error) {
      setHolidayArray([]);
    }
  };
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Special Working Day"
        exportUrl={service.API_URL.specialWorking.export}
      />
      {specialDayId && (
        <EditSpecialWorkingDay specialDayId={specialDayId} form={form} />
      )}
      <CommonForm
        open={openAddModal}
        mdlTitle="Add Special Working Day"
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <>
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
              <div className="special-date flex">
                <Form.Item
                  label="Select Month"
                  name="startDate"
                  className="form-item"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <DatePicker
                    className="date-picker"
                    // defaultValue={dayjs('', dateFormat)}
                    format={dateFormat}
                    picker="month"
                  />
                </Form.Item>
                <div className="relative">TO</div>
                <Form.Item
                  name="endDate"
                  className="form-item end-date"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <DatePicker
                    className="date-picker"
                    format={dateFormat}
                    picker="month"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => handleClickDate()}
                  className="btn-main"
                >
                  {searchIcon}
                </Button>
              </div>

              <SelectBox
                label="Select all records for"
                name="holidayweekoff"
                keyField="id"
                valueField="text"
                mode={false}
                required={false}
                selectOptions={holidayweekoff}
                selectPlaceholder="Select all records for"
                handleMultiSelectChange={(value: any) =>
                  handleMultiSelectChange(value)
                }
              />

              <div />
            </div>
            <div className="desc-table-main flex">
              <Table
                className="desc-table overflow-auto"
                dataSource={holidayArray}
                columns={column}
                rowClassName={(record: any, index: any) =>
                  index === selectedRowKey ? 'active-row' : ''
                }
                onRow={(record: any, index: any) => ({
                  onClick: () => onRowClick(record, index),
                })}
              />

              <div className="desc-right-table">
                <label className="desc-label">
                  Edit Special Working Day Details
                </label>
                <Form.Item
                  label="Start Time"
                  name="startTime"
                  className="form-item"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <TimePicker className="date-picker" name="startTime" />
                </Form.Item>
                <Form.Item
                  label="End Time"
                  name="endTime"
                  className="form-item"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <TimePicker className="date-picker" name="endTime" />
                </Form.Item>

                <SelectBox
                  label="Work Center"
                  name="workCenter"
                  keyField="workCenterId"
                  valueField="workCenterName"
                  mode
                  required
                  selectOptions={listData.workCenter}
                  selectPlaceholder="Select Work Center"
                />
                <div className="reason-field">
                  <InputBox
                    label="Reason"
                    name="reason"
                    required
                    validateAsNumber={false}
                    validateAsString={false}
                  />
                </div>
              </div>
            </div>
          </>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default SpecialWorkingDay;
