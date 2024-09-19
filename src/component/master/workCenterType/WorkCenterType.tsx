'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  Flex,
  Form,
  Input,
  Popconfirm,
  Select,
  Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const WorkCenterType = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [form] = Form.useForm();
  const { addData, updateData,  getItemById }: any = useFetchData(
    service?.API_URL?.workType.listing
  );
  const [workCenterTypeId, setWorkCenterTypeId] = useState<any>();
  const dispatch = useDispatch();

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.workCenterTypeMaster[0])}
          url={service?.API_URL?.workType?.listing}
          exportUrl={service?.API_URL?.workType?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Work Center Type',
      dataIndex: 'workCenterTypeName',
      sorter: {
        compare: commonSorter('workCenterTypeName'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="WorkCenterTypes"
          idName="workCenterTypeId"
          idValue={record.workCenterTypeId}
          status={record.status}
          url={service?.API_URL?.workType.listing}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.workCenterTypeId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.workCenterTypeId} deleteUrl={service?.API_URL?.workType?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setWorkCenterTypeId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.workType.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
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
  const onFinish = async (data: any) => {
    const body = {
      ...data,
      workCenterTypeId: workCenterTypeId || 0,
      isDelete: false,
    };
    if (workCenterTypeId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.workType.update
      );
      if (updateDataRes?.apiStatus) {
        setWorkCenterTypeId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.workType.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  

  useEffect(() => {
    if (!openAddModal) {
      setWorkCenterTypeId('');
    }
  }, [openAddModal]);

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Work Center Type"
        breadCum="Manage Work Center Type"
        exportUrl={service.API_URL.workType.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          workCenterTypeId ? 'Edit Work Center Type' : 'Add Work Center Type'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Work Center Type"
              name="workCenterTypeName"
              required
              inputPlaceholder="Work Center Type"
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

export default WorkCenterType;
