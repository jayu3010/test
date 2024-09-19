'use client';

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Popconfirm, Flex, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import { commonSorter } from '@/utils/functions/commonFunction';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const Employees = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [employeeId, setEmployeeId] = useState('');
  const dispatch = useDispatch();
  const [shiftsDataArray, setShiftsDataArray] = useState([]);

  const [form] = Form.useForm();
  const {
    getQueryFetch,
    listData,
    getListData,
    updateData,
    addData,
    
    getItemById,
  } = useFetchData(service.API_URL.employees.listing);
  const [empType, setEmpType] = useState({
    supervisor: false,
    assistantManager: false,
    isOperator: false,
  });
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageEmployee[0])}
          url={service?.API_URL?.employees?.listing}
          exportUrl={service?.API_URL?.employees?.export}
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
      title: 'Employee First Name',
      dataIndex: 'firstName',
      sorter: {
        compare: commonSorter('firstName'),
        multiple: 3,
      },
    },

    {
      title: 'Employee Last Name',
      dataIndex: 'lastName',
      sorter: {
        compare: commonSorter('lastName'),
        multiple: 3,
      },
    },
    {
      title: 'EMP Type',
      dataIndex: 'EMPType',
      sorter: false,
      render: (_: any, record: any) => {
        return (
          <Tag color="#f40">
            {record.supervisor
              ? 'Supervisor'
              : record?.isOperator
                ? 'Operator'
                : record?.assistantManager
                  ? 'Assistant Manager'
                  : null}
          </Tag>
        );
      },
    },
    {
      title: 'EMP Code',
      dataIndex: 'empCode',
      sorter: {
        compare: commonSorter('empCode'),
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
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="employees"
          idName="empId"
          idValue={record.empId}
          status={record.status}
          url={service?.API_URL?.employees?.listing}
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
            onClick={() => handleEdit(record.empId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.empId} deleteUrl={service?.API_URL?.employees?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      empId: employeeId || 0,
      ...data,
      empType,
    };
    if (employeeId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.employees?.update
      );

      if (updateDataRes?.apiStatus) {
        setEmployeeId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.employees?.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setEmployeeId(id);
      const queryParams = { empId: id };
      const apiUrl = service.API_URL.employees.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const empTypeValue = editMachineRes[0].supervisor
          ? 'Supervisor'
          : editMachineRes[0].assistantManager
            ? 'Asst.Manager'
            : editMachineRes[0].isOperator
              ? 'Operator'
              : null;
        const formattedRes = {
          ...editMachineRes[0],
          empType: empTypeValue,
        };

        handleMultiSelectChange(editMachineRes[0].unitId);
        form.setFieldsValue({ shiftId: editMachineRes[0].shiftId });
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
  const modalListing = async () => {
    try {
      const apiUrls = {
        shiftsData: service?.API_URL?.shiftManagement?.listing,
        unitList: service?.API_URL?.unitList?.listing,
      };
      const enable = !!employeeId;
      await getListData(apiUrls, enable);
    } catch (error) {
      console.error('Error fetching common data:', error);
    }
  };
  const handleMultiSelectChange = async (selectedValues: any) => {
    const queryParams = { unitId: selectedValues };
    const editMachineRes: any = await getQueryFetch(
      queryParams,
      service.API_URL.shiftManagement.listing
    );
    if (editMachineRes) {
      setShiftsDataArray(editMachineRes);
    }
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setEmployeeId('');
    }
  }, [openAddModal]);
  const handleEmpTypeChange = (value) => {
    const newEmpType = {
      supervisor: value === 'Supervisor',
      assistantManager: value === 'Asst.Manager',
      isOperator: value === 'Operator',
    };
    setEmpType(newEmpType);
  };

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Employee"
        exportUrl={service.API_URL.employees.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.employees.import}
        fetchUrl={service?.API_URL?.employees?.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={employeeId ? 'Edit Employee' : 'Add Employee'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SelectBox
              label="Unit"
              name="unitId"
              keyField="unitId"
              valueField="unitName"
              mode={false}
              required
              selectOptions={listData?.unitList}
              handleMultiSelectChange={(selectedValues: any) =>
                handleMultiSelectChange(selectedValues)
              }
              selectPlaceholder="Select Unit"
            />
            <SelectBox
              label="Shift Name"
              name="shiftId"
              keyField="shiftId"
              valueField="shiftName"
              mode={false}
              required
              disabled={!(shiftsDataArray.length > 0)}
              selectOptions={shiftsDataArray}
              selectPlaceholder="Select Shift"
            />
            <InputBox
              label="Employee First Name"
              name="firstName"
              required
              inputPlaceholder="Name"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
            />
            <InputBox
              label="Employee Last Name"
              name="lastName"
              required
              inputPlaceholder="Name"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
            />
            <SelectBox
              label="Emp Type"
              name="empType"
              keyField="label"
              valueField="value"
              mode={false}
              required
              selectOptions={[
                { value: 'Asst.Manager', label: 'Asst.Manager' },
                { value: 'Operator', label: 'Operator' },
                { value: 'Supervisor', label: 'Supervisor' },
              ]}
              selectPlaceholder="Emp Type"
              handleMultiSelectChange={handleEmpTypeChange}
            />
            <InputBox
              label="EMP code"
              name="empCode"
              required
              inputPlaceholder="EMP code"
              validateAsNumber={false}
              validateAsString={false}
              max={10}
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

export default Employees;
