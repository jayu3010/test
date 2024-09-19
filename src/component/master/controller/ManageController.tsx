'use client'

import React, { useState } from 'react'

import { Button, Collapse, Form, DatePicker, Popconfirm, Flex } from 'antd'
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
import {
  commonSorter,
  showFormattedDate,
} from '@/utils/functions/commonFunction';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData'

import dayjs from 'dayjs'

import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const ManageController = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [controllerMasterId, setControllerMasterId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData, getQueryFetch } = useFetchData(
    service?.API_URL?.controllerMaster.listing
  );
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(
            filterOptiondata.controllermasterFilter[0]
          )}
          url={service?.API_URL?.controllerMaster?.listing}
          exportUrl={service?.API_URL?.controllerMaster?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'controllerName',
      sorter: {
        compare: commonSorter('controllerName'),
        multiple: 3,
      },
    },
    {
      title: 'Warranty Status',
      dataIndex: 'warrantyStatus',
      render: (_, record: any) => <>{record.warrantyStatus ? 'Yes' : 'No'}</>,
    },

    {
      title: 'Start Date',
      dataIndex: 'startDate',
      sorter: {
        compare: commonSorter('startDate'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record.startDate)}</>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      sorter: {
        compare: commonSorter('endDate'),
        multiple: 3,
      },
      render: (_, record: any) => <>{showFormattedDate(record.endDate)}</>,
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      sorter: {
        compare: commonSorter('remarks'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="MachineControllers"
            idName="controllerId"
            idValue={record.controllerId}
            status={record.status}
            url={service?.API_URL?.controllerMaster?.listing}
          />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <>
          <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.controllerId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.controllerId} deleteUrl={service?.API_URL?.controllerMaster?.listing} />
          </Flex>
        </>
      ),
    },
  ];



  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      controllerId: controllerMasterId || 0,
      ...data,
      startDate: data.startDate ? data.startDate.format('YYYY-MM-DD') : '',
      endDate: data.endDate ? data.endDate.format('YYYY-MM-DD') : '',
    };

    if (controllerMasterId) {
      const updateDataRes =  await updateData(body, service?.API_URL?.controllerMaster?.update)

      if (updateDataRes?.apiStatus) {
        setControllerMasterId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.controllerMaster?.add)
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setControllerMasterId(id);
      const queryParams = { machineControllerId: id };
      const apiUrl = service.API_URL.controllerMaster.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const formattedRes = {
          ...editMachineRes[0],
          startDate: editMachineRes[0].startDate
            ? dayjs(editMachineRes[0].startDate, 'YYYY-MM-DD')
            : null,
          endDate: editMachineRes[0].endDate
            ? dayjs(editMachineRes[0].endDate, 'YYYY-MM-DD')
            : null,
        };
        form.setFieldsValue(formattedRes);
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

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Controller"
        exportUrl={service.API_URL.controllerMaster.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.controllerMaster.import}
        fetchUrl={service?.API_URL?.controllerMaster?.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={controllerMasterId ? 'Edit Controller' : 'Add Controller'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InputBox
                label="Name"
                name="controllerName"
                required={true}
                inputPlaceholder="Name"
                validateAsNumber={false}
                validateAsString={false}
                max={30}
              />

              <SelectBox
                label="Warranty Status"
                name="warrantyStatus"
                keyField="label"
                valueField="value"
                mode={false}
                required={true}
                selectOptions={[
                  { value: 'Yes', label: true },
                  { value: 'No', label: false },
                ]}
                selectPlaceholder="Warranty Status"
              />
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'This field is required' }]}
                className="form-item"
              >
                <DatePicker className='date-picker' format={'DD-MMM-YYYY'} name='startDate' />
              </Form.Item>

              <Form.Item
                name="endDate"
                label="End Date" className="form-item"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <DatePicker className='date-picker' format={'DD-MMM-YYYY'} name='endDate' />
              </Form.Item>
              <InputBox
                label="Remarks"
                name="remarks"
                required={false}
                inputPlaceholder="Remarks"
                validateAsNumber={false}
                validateAsString={false}
                max={50}
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

export default ManageController;
