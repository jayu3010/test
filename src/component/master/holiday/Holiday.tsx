'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Select,
  Switch,
  Flex,
  DatePicker,
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
import {
  capitalizeFirstLetter,
  commonSorter,
  showFormattedDate,
} from '@/utils/functions/commonFunction';
import useIdStore from '@/utils/hook/useIdStore';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const Holiday = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const { storedId, storeId } = useIdStore();
  // const [holidayId, setHolidayId] = useState<any>()
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    listData,
    
    getQueryFetch,
    getListData,
  }: any = useFetchData(service?.API_URL?.holidays.listing);

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
      title: 'Holiday Type',
      dataIndex: 'holidayType',
      sorter: {
        compare: commonSorter('holidayType'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>{capitalizeFirstLetter(record?.holidayType)}</>
      ),
    },

    {
      title: 'Holiday Name',
      dataIndex: 'holidayName',
      sorter: {
        compare: commonSorter('holidayName'),
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
      title: 'End Date',
      dataIndex: 'endDate',
      sorter: {
        compare: commonSorter('endDate'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record?.endDate)}</>,
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
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="holidays"
          idName="holidayId"
          idValue={record.holidayId}
          status={record.status}
          url={service?.API_URL?.holidays?.listing}
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
            onClick={() => handleEdit(record.holidayId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.holidayId} deleteUrl={service?.API_URL?.holidays?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      holidayId: storedId || 0,
      isDelete: false,
      startDate: data.startDate ? data.startDate.format('YYYY-MM-DD') : '',
      endDate: data.endDate ? data.endDate.format('YYYY-MM-DD') : '',
    };
    if (storedId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.holidays.update
      );
      if (updateDataRes?.apiStatus) {
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.holidays.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      storeId(id);
      // setHolidayId(id)
      const queryParams = { holidayId: id };
      const apiUrl = service.API_URL.holidays.getbyid;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        const dataWithMomentDates = {
          ...editMachineRes[0],
          startDate: editMachineRes[0].startDate
            ? dayjs(editMachineRes[0].startDate, 'MM/DD/YYYY')
            : null,
          endDate: editMachineRes[0].endDate
            ? dayjs(editMachineRes[0].endDate, 'MM/DD/YYYY')
            : null,
        };
        form.setFieldsValue(dataWithMomentDates);
        dispatch(openModal());
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes);
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
    };
    const enable = !!storedId;

    await getListData(apiUrls, enable);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.holidayFilter[0])}
          url={service?.API_URL?.holidays?.listing}
          exportUrl={service?.API_URL?.holidays?.export}
        />
      ),
    },
  ];

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Holiday"
        exportUrl={service.API_URL.holidays.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.holidays.import}
        fetchUrl={service?.API_URL?.holidays.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={storedId ? 'Edit Holiday' : 'Add Holiday'}
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

            <SelectBox
              label="Holiday Type"
              name="holidayType"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: 'national', label: 'National' },
                { value: 'state', label: 'State' },
              ]}
              selectPlaceholder="Select Holiday Type"
            />

            <InputBox
              label="Holiday Name"
              name="holidayName"
              required
              inputPlaceholder="Holiday Name"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
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

export default Holiday;
