'use client'

import React, { useState, useEffect } from 'react'

import { Button, Collapse, Form, Popconfirm, Switch, Tag, Flex } from 'antd'
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
import InputBox from '@/component/input/Input';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const ManageSupervisorGroup = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [supervisorName, setSupervisorName] = useState([]);

  const [supervisorId, setSupervisorId] = useState<any>();
  const {
    listData,
    addData,
    getListData,
    updateData,
    
    getQueryFetch,
  } = useFetchData(service?.API_URL?.supervisoursGroup.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.supervisorGroupFilter[0])}
          url={service?.API_URL?.supervisoursGroup?.listing}
          exportUrl={service?.API_URL?.supervisoursGroup?.export}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: false,
      render: (_: any, record: any) => (
        <>
          {record?.supervisors?.map((item: any, index: any) => {
            return (
              <Tag color="#6D72EA" key={index}>
                {item?.unitName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Group Name',
      dataIndex: 'supervisorGroupName',
      sorter: {
        compare: commonSorter('supervisorGroupName'),
        multiple: 3,
      },
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisors',
      key: 'supervisors',
      render: (_: any, record: any) => (
        <>
          {record?.supervisors?.map((item: any, index: any) => {
            return (
              <Tag color="#6D72EA" key={index}>
                {item.firstName}
              </Tag>
            );
          })}
        </>
      ),
      sorter: (a: any, b: any) => {
        const aNames = a.supervisors
          .map((item: any) => `${item.firstName  } ${  item.lastName}`)
          .join(', ');
        const bNames = b.supervisors
          .map((item: any) => `${item.firstName  } ${  item.lastName}`)
          .join(', ');
        return aNames.localeCompare(bNames);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="SupervisorGroups"
            idName="supervisorGroupId"
            idValue={record.supervisorGroupId}
            status={record.status}
            url={service?.API_URL?.supervisoursGroup?.listing}
          />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className='action-icon'>
            <Button onClick={() => handleEdit(record.supervisorGroupId)} className='btn-outline' >{editIcon}</Button>
            <Button className='btn-outline' >{timeIcon}</Button>
            <DeleteModal id={record.supervisorGroupId} deleteUrl={service?.API_URL?.supervisoursGroup?.listing} />
          </Flex>
      ),
    },
  ];


  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      supervisorGroupId: supervisorId || 0,
      supervisoursGroupName: data?.supervisorGroupName,
      isDelete: false,
    };
    if (supervisorId) {
      await updateData(
        body,
        service?.API_URL?.supervisoursGroup.update,
        form.resetFields()
      );
      setSupervisorId('');
    } else {
      await addData(
        body,
        service?.API_URL?.supervisoursGroup.add,
        form.resetFields()
      );
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setSupervisorId(id);

      const queryParams = { supervisorGroupId: id };
      const apiUrl = service.API_URL.supervisoursGroup.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);

      if (editMachineRes[0]) {
        const unitIdRes = editMachineRes[0]?.supervisors?.map(
          (item: any) => item?.unitId
        );
        dispatch(openModal());
        handleMultiSelectChange(unitIdRes, 'unitId');
        const supervisorData = editMachineRes[0]?.supervisors?.map(
          (item: any) => item?.supervisorId
        );
        form.setFieldValue('unitId', unitIdRes);
        form.setFieldValue('supervisorIds', supervisorData);
        form.setFieldsValue(editMachineRes[0]);
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes[0]);
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
    const apiUrls: any = {
      employees: service?.API_URL?.employees?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setSupervisorId('');
      setSupervisorName([]);
    }
  }, [openAddModal]);
  const handleMultiSelectChange = async (
    selectedValues: any,
    name?: any,
    id?: any
  ) => {
    const assistantParam = { unitId: selectedValues, supervisor: true };
    const assistantRes: any = await getQueryFetch(
      assistantParam,
      service.API_URL.employees.listing
    );
    setSupervisorName(assistantRes);
  };

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Supervisor Group"
        exportUrl={service.API_URL.supervisoursGroup.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          supervisorId ? 'Edit Supervisor Group' : 'Add Supervisor Group'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InputBox
                label="Supervisor Group Name"
                name="supervisorGroupName"
                required={true}
                inputPlaceholder="Supervisor Group Name"
                validateAsNumber={false}
                validateAsString={false}
                max={20}
              />

              <SelectBox
                label="Unit"
                name="unitId"
                keyField="unitId"
                valueField="unitName"
                mode={false}
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Select Unit"
                // value={unitId}
                handleMultiSelectChange={(value: any) => handleMultiSelectChange(value, 'unitId')}
              />


              <SelectBox
                label="Supervisor Name"
                name="supervisorIds"
                keyField="empId"
                valueField="firstName"
                mode={true}
                required={true}
                selectOptions={supervisorName || []}
                selectPlaceholder="Supervisor Name"
                disabled={!supervisorName?.length}
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

export default ManageSupervisorGroup;
