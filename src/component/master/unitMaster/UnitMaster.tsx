'use client';

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Flex, Form, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import ImportFile from '@/component/fileUpload/ImportFile';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import SelectBox from '@/component/selectbox/selectbox';
import InputBox from '@/component/input/Input';
import { commonSorter } from '@/utils/functions/commonFunction';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import useIdStore from '@/utils/hook/useIdStore';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const UnitMaster = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { storedId, storeId } = useIdStore();
  const [unitData, setUnitData]=useState([])
  const [form] = Form.useForm();
  const { addData, updateData, getItemById } = useFetchData(
    service?.API_URL?.unitList?.listing
  );
  const dispatch = useDispatch();
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.unitMaster[0])}
          url={service?.API_URL?.unitList?.listing}
          exportUrl={service?.API_URL?.unitList?.export}
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
      title: 'City',
      dataIndex: 'city',
      sorter: {
        compare: commonSorter('city'),
        multiple: 3,
      },
    },
    {
      title: 'State',
      dataIndex: 'state',
      sorter: {
        compare: commonSorter('state'),
        multiple: 3,
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      sorter: {
        compare: commonSorter('country'),
        multiple: 2,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="units"
          idName="unitId"
          idValue={record.unitId}
          status={record.status}
          url={service?.API_URL?.unitList?.listing}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.unitId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.unitId} deleteUrl={service?.API_URL?.unitList?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      storeId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.unitList.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
      } else {
        // Handle the case where apiStatus is false
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
      unitId: storedId || 0,
      isDelete: false,
    };
    if (storedId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.unitList.update
      );
      if (updateDataRes?.apiStatus) {
        storeId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.unitList.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleCountryChange = (value: any) => {
    setSelectedCountry(value);
    form.setFieldsValue({ state: undefined }); // Reset state value when country changes
  };
useEffect(()=>{
if(filterData){
  setUnitData(filterData)
}
},[filterData])
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Unit"
        exportUrl={service.API_URL.unitList.export}
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <ImportFile
        importUrl={service?.API_URL?.unitList.import}
        fetchUrl={service?.API_URL?.unitList.listing}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={storedId ? 'Edit Unit' : 'Add Unit'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Unit Name"
              name="unitName"
              required
              inputPlaceholder="Unit Name"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />
            <SelectBox
              label="Country"
              name="country"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[{ value: 'India', label: 'India' }]}
              selectPlaceholder="Country"
              handleMultiSelectChange={(value: any) =>
                handleCountryChange(value)
              }
            />

            <SelectBox
              label="State"
              name="state"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[{ value: 'Gujarat', label: 'Gujarat' }]}
              selectPlaceholder="State"
              disabled={!selectedCountry}
            />

            <InputBox
              label="City"
              name="city"
              required
              inputPlaceholder="City"
              validateAsNumber={false}
              validateAsString
              max={50}
            />

            <div>
              <CommonSwitch
                label="Status"
                name="status"
                checkedChildren="Active"
                unCheckedChildren="InActive"
              />
            </div>
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

export default UnitMaster;
