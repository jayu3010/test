'use client'

import React, { useState, useEffect } from 'react'

import { Button, Collapse, Form,  Popconfirm,  Tag, Flex } from 'antd'
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
import InputBox from '@/component/input/Input';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const MainCategory = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const [maincategorId, setMaincategorId] = useState('');
  const filterData = useSelector((state: any) => state.filterData);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    listData,
    updateData,
    
    getQueryFetch,
    getListData,
  } = useFetchData(service?.API_URL?.maincategories?.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(
            filterOptiondata.machineManageMainCategory[0]
          )}
          url={service?.API_URL?.maincategories?.listing}
          exportUrl={service?.API_URL?.maincategories?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: false,
      render: (_, record: any) => (
        <>
          {record?.units?.map((unitItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {unitItem?.unitName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Main Category',
      dataIndex: 'mainCategory',
      sorter: {
        compare: commonSorter('mainCategory'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <SwitchComponent
            masterName="MachineMainCategories"
            idName="machineMainCategoryId"
            idValue={record.machineMainCategoryId}
            status={value}
            url={service?.API_URL?.maincategories?.listing}
          />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.machineMainCategoryId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.machineMainCategoryId} deleteUrl={service?.API_URL?.maincategories?.listing} />
          </Flex>
        </>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setMaincategorId(id);
      const queryParams = { machineMainCategoryId: id };
      const apiUrl = service.API_URL.maincategories.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const units = editMachineRes[0]?.units?.map((unit) => unit.unitId);

        // setMaincategorData(editMachineRes[0].units)
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
      machineMainCategoryId: maincategorId || 0,
      ...data,
      isDelete: false,
    };
    if (maincategorId) {
      await updateData(
        body,
        service?.API_URL?.maincategories.update,
        form.resetFields()
      );
      setMaincategorId('');

    } else {
      await addData(
        body,
        service?.API_URL?.maincategories.add,
        form.resetFields()
      );
    }
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
      setMaincategorId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Main Category"
        exportUrl={service.API_URL.maincategories.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={maincategorId ? 'Edit Main Category' : 'Add Main Category'}
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
                mode={true}
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Select Unit"
              />

              <InputBox
                label="Main Category"
                name="mainCategory"
                required={true}
                inputPlaceholder="Main Category"
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

export default MainCategory;
