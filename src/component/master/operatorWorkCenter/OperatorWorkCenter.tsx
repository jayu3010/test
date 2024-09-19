'use client'

import React, { useState, useEffect } from 'react'

import { Button, Collapse, Form,  Switch, Flex, Tag } from 'antd'
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
import { editIcon } from '@/utils/icons/icons';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';

const OperatorWorkCenter = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [employeeList, setEmployee] = useState([]);
  const [workcenterData, setWorkcenterData] = useState([]);

  const [operatorId, setOperatorId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    
    getQueryFetch,
    getListData,
    listData,
  }: any = useFetchData(service.API_URL.WorkCenterOperator.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageDriver[0])}
          url={service?.API_URL?.WorkCenterOperator?.listing}
          exportUrl={service?.API_URL?.WorkCenterOperator?.export}
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
      title: 'Operator First Name',
      dataIndex: 'operatorFirstName',
      sorter: {
        compare: commonSorter('operatorFirstName'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>
          {record?.operators?.map((operatorItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {operatorItem?.firstName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Operator Last Name',
      dataIndex: 'operatorLastName',
      sorter: {
        compare: commonSorter('operatorLastName'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>
          {record?.operators?.map((operatorItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {operatorItem?.lastName}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: 'Work Center',
      dataIndex: 'workCenterName',
      sorter: {
        compare: commonSorter('workCenterName'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: any) => (
        <>
          <Form.Item name="status" className="form-item">
            <Switch checked={record.status} />
          </Form.Item>
        </>
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
              onClick={() => handleEdit(record.workCenterId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
          </Flex>
        </>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    delete data.unitId;
    const body = {
      ...data,
      wcOprID: operatorId || 0,
    };
    if (operatorId) {
      const updateDataRes = await updateData(body, service?.API_URL?.WorkCenterOperator.update)
      if (updateDataRes?.apiStatus) {
        setOperatorId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.WorkCenterOperator.add)
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setOperatorId(id);
      const queryParams = { workCenterId: id };
      const apiUrl = service.API_URL.WorkCenterOperator.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        form.setFieldsValue(editMachineRes[0]);
        dispatch(openModal());
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
      setOperatorId('');
    }
  }, [openAddModal]);
  const handleMultiSelectChange = async (selectedValues: any) => {
    const queryParams = { unitId: selectedValues };
    const editMachineRes: any = await getQueryFetch(
      queryParams,
      service.API_URL.employees.listing
    );
    const workCenterData: any = await getQueryFetch(
      queryParams,
      service.API_URL.manageworkcenter.listing
    );

    if (editMachineRes) {
      setEmployee(editMachineRes);
    }
    if (workCenterData) {
      setWorkcenterData(workCenterData);
    }
  };
  return (
    <div>
      <CommonHeader addBtnTitle="Add Operator With Work Center" />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          operatorId
            ? 'Edit Operator With Work Center'
            : 'Add Operator With Work Center'
        }
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
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Select Unit"
                handleMultiSelectChange={(selectedValues: any) => handleMultiSelectChange(selectedValues)}
              />
              <SelectBox
                label="Operator Name"
                name="operatorIds"
                keyField="empId"
                valueField="firstName"
                mode={true}
                required={true}
                selectOptions={employeeList}
                selectPlaceholder="Select Operator Name"
              />
              <SelectBox
                label="Work Center"
                name="workCenterId"
                keyField="workCenterId"
                valueField="workCenterName"
                mode={false}
                required={true}
                selectOptions={workcenterData}
                selectPlaceholder="Select Work Center"
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

export default OperatorWorkCenter;
