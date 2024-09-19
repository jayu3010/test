'use client';

import React, { useState, useEffect } from 'react';
import { Button, Form, Popconfirm, Switch, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const AsstManager = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const dispatch = useDispatch();
  const [asstId, setAsstId] = useState<any>();
  const [shiftsDataArray, setShiftsDataArray] = useState([]);
  const [form] = Form.useForm();
  const {
    getQueryFetch,
    listData,
    getListData,
    updateData,
    addData,
  } = useFetchData(service.API_URL.employees.listing);

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
      title: 'Asst. Manager First Name',
      dataIndex: 'firstName',
      sorter: {
        compare: commonSorter('firstName'),
        multiple: 3,
      },
    },
    {
      title: 'Asst. Manager Last Name',
      dataIndex: 'lastName',
      sorter: {
        compare: commonSorter('lastName'),
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
          url={service.API_URL.employees.listing}
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
      ...data,
      empId: asstId || 0,
      assistantManager: true,
      supervisor: false,
      isDelete: false,
    };
    if (asstId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.asstManagerMaster.update
      );
      if (updateDataRes.apiStatus) {
        form.resetFields();
        setAsstId('');
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.asstManagerMaster.add
      );
      if (addDataRes.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setAsstId(id);
      const queryParams = { empId: id };
      const apiUrl = service.API_URL.asstManagerMaster.getbyid;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes[0]);
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
      await getListData(apiUrls);
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
      setAsstId('');
    }
  }, [openAddModal]);

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Asst. Manager"
        exportUrl={service.API_URL.asstManagerMaster.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={asstId ? 'Edit Asst. Manager' : 'Add Asst. Manager'}
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
              label="Asst. Manager Name"
              name="firstName"
              required
              inputPlaceholder="Asst. Manager Name"
              validateAsNumber={false}
              validateAsString={false}
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
      {/* <div className='block-main__filter border-y-[1px] border-border py-4'>
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div> */}
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default AsstManager;
