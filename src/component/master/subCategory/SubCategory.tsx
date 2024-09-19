'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Switch,
  Tag,
  Flex,
} from 'antd';
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
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const SubCategory = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [machineSubCategoryId, setMachineSubCategoryId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    getListData,
    listData,
    
    getQueryFetch,
  } = useFetchData(service?.API_URL?.managesubcategory?.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(
            filterOptiondata.machineManageSubCategory[0]
          )}
          url={service?.API_URL?.managesubcategory?.listing}
          exportUrl={service?.API_URL?.managesubcategory?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Main Category',
      dataIndex: 'mainCategory',
      sorter: {
        compare: commonSorter('mainCategory'),
        multiple: 3,
      },
    },
    {
      title: 'Sub Category',
      dataIndex: 'subCategory',
      sorter: {
        compare: commonSorter('subCategory'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <SwitchComponent
          masterName="MachineSubCategories"
          idName="machineSubCategoryId"
          idValue={record.machineSubCategoryId}
          status={value}
          url={service?.API_URL?.managesubcategory?.listing}
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
            onClick={() => handleEdit(record.machineSubCategoryId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.machineSubCategoryId} deleteUrl={service?.API_URL?.managesubcategory?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setMachineSubCategoryId(id);
      const queryParams = { machineSubCategoryId: id };
      const apiUrl = service.API_URL.managesubcategory.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const units = editMachineRes[0].units.map((unit) => unit.unitId);
        form.setFieldsValue(editMachineRes[0]);
        form.setFieldsValue({ unitId: units });
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
  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      machineSubCategoryId: machineSubCategoryId || 0,
      ...data,
      isDelete: false,
    };
    if (machineSubCategoryId) {
      await updateData(
        body,
        service?.API_URL?.managesubcategory.update,
        form.resetFields()
      );
      setMachineSubCategoryId('');
    } else {
      await addData(
        body,
        service?.API_URL?.managesubcategory.add,
        form.resetFields()
      );
    }
  };
  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      mainCategory: service?.API_URL?.maincategories?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setMachineSubCategoryId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Sub Category"
        exportUrl={service.API_URL.managesubcategory.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          machineSubCategoryId ? 'Edit Sub Category' : 'Add Sub Category'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* <SelectBox
                label="Unit Name"
                name="unitId"
                keyField="unitId"
                valueField="unitName"
                mode={true}
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Unit Name"
              /> */}
            <SelectBox
              label="Main Category"
              name="machineMainCategoryId"
              keyField="machineMainCategoryId"
              valueField="mainCategory"
              mode={false}
              required
              selectOptions={listData?.mainCategory}
              selectPlaceholder="Main Category"
            />

            <InputBox
              label="Sub Category"
              name="subCategory"
              required
              inputPlaceholder="Sub Category"
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

export default SubCategory;
