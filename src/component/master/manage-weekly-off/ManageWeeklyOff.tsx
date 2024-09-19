'use client'

import React, { useState, useEffect } from 'react'

import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Popconfirm,
  Switch,
  Tag,
  Typography,
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
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import {
  commonSorter,
  showFormattedDate,
} from '@/utils/functions/commonFunction';
import dayjs from 'dayjs';
import { capitalize } from 'lodash'

import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const { Text } = Typography;

const ManageWeeklyOff = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const dispatch = useDispatch();
  const {
    addData,
    updateData,
    listData,
    getItemById,
    getListData,
  }: any = useFetchData(service?.API_URL?.weekoff.listing);

  const [weekOffId, setWeekOffId] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDaysError, setSelectedDaysError] = useState('');

  const [form] = Form.useForm();


  const fullDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const toggleDay = (index: number) => {
    setSelectedDays((prevSelectedDays: any) =>
      prevSelectedDays.includes(index)
        ? prevSelectedDays.filter((dayIndex: any) => dayIndex !== index)
        : [...prevSelectedDays, index]
    );
  };

  const convertIndicesToDays = (indices: any) => {
    return indices.map((index: any) => fullDay[index]);
  };

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
      title: 'Week Off Day',
      dataIndex: 'machineShopOfName',
      sorter: false,
      render: (_: any, record: any) => (
        <>
          {record?.weekOffDay?.map((item: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {capitalize(item)}
              </Tag>
            );
          })}
        </>
      ),
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
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="WeekOffs"
            idName="weekOffId"
            idValue={record.weekOffId}
            status={record.status}
            url={service?.API_URL?.weekoff?.listing}
          />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <>
          <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.weekOffId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button
              onClick={() => handleEdit(record.weekOffId)}
              className="btn-outline"
            >
              {timeIcon}
            </Button>
            <DeleteModal id={record.weekOffId} deleteUrl={service?.API_URL?.weekoff?.listing} />
          </Flex>
        </>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setWeekOffId(id);
      const weekOffRes: any = await getItemById(
        id,
        service.API_URL.weekoff.getbyid
      );

      if (weekOffRes) {
        setSelectedDays(
          weekOffRes.weekOffDay?.map((day: any) => fullDay.indexOf(day))
        );

        const dataWithMomentDates = {
          ...weekOffRes,
          startDate: dayjs(weekOffRes.startDate, 'YYYY-MM-DD'),
          endDate: dayjs(weekOffRes.endDate, 'YYYY-MM-DD'),
        };
        form.setFieldsValue(dataWithMomentDates);
        dispatch(openModal());
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', weekOffRes);
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
  };
  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
 

    if(selectedDays.length==0)
    {
      setSelectedDaysError('This field is required');
      return
    }
    
      setSelectedDaysError('');
    

    const body = {
      ...data,
      startDate: data.startDate ? data.startDate.format('YYYY-MM-DD') : '',
      endDate: data.endDate ? data.endDate.format('YYYY-MM-DD') : '',
      weekOffId: weekOffId ? weekOffId : 0,
      isDelete: false,
      weekOffDay: convertIndicesToDays(selectedDays),
    }
    if (weekOffId) {
      let updateDataRes = await updateData(
        body,
        service?.API_URL?.weekoff.update);
        if (updateDataRes?.apiStatus) {
          setWeekOffId('')
          form.resetFields()
        }
    } else {
      let addDataRes = await addData(body, service?.API_URL?.weekoff.add)
      if (addDataRes?.apiStatus) {
        form.resetFields()
      }

    }
  }
  const modalListing = async () => {
    const apiUrls = { unitList: service?.API_URL?.unitList?.listing };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setSelectedDays([]);
      setWeekOffId('');
    }
  }, [openAddModal]);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageweeklyoff[0])}
          url={service?.API_URL?.weekoff?.listing}
          exportUrl={service?.API_URL?.weekoff?.export}
        />
      ),
    },
  ];
  



  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Weekly Off"
        exportUrl={service.API_URL.weekoff.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={weekOffId ? 'Edit Weekly Off' : 'Add Weekly Off'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <SelectBox
                label="Unit Name"
                keyField="unitId"
                valueField="unitName"
                name="unitId"
                mode={false}
                required={true}
                selectOptions={listData.unitList}
                selectPlaceholder="Unit Name"
              />
              <Form.Item
                name="startDate"
                label="Start Date" className="form-item"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <DatePicker className='date-picker' format={'DD-MMM-YYYY'} name='startDate' />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date" className="form-item"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <DatePicker className='date-picker' name='endDate' format={'DD-MMM-YYYY'} />
              </Form.Item>
          
              <Card
                className='week-card'
              >
                <label htmlFor="" className='block'>Weekly</label>
                <div className="flex space-x-2 week-calender" >
                  {fullDay.map((day, index) => (
                    <Button
                      key={index}
                      type={selectedDays.includes(index) ? 'primary' : 'default'}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer border`}
                      style={{
                        backgroundColor: selectedDays.includes(index)
                          ? '#1890ff'
                          : '#fff',
                        color: selectedDays.includes(index) ? '#fff' : '#000',
                        boxShadow: selectedDays.includes(index)
                          ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                          : 'none',
                      }}
                      onClick={() => toggleDay(index)}
                    >
                      <Text>{day.substring(0, 2)}</Text>
                    </Button>
                  ))}
                </div>
                <span className='required-msg'>{selectedDaysError}</span>
              </Card>
              
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
      <TableComponent columns={columns} data={filterData || []} />
    </div>
  );
};

export default ManageWeeklyOff;
