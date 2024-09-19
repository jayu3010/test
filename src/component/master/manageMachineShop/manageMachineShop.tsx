'use client';

import { Button, Collapse, Flex, Form, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import { openModal } from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageMachineShop = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const {
    addData,
    updateData,
    listData,
    getListData,
    getItemById,
    
  }: any = useFetchData(service?.API_URL?.machineShop?.listing);
  const [machineShopId, setMachineShopId] = useState<any>();

  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: {
        compare: (a: any, b: any) => a.unitName.localeCompare(b.unitName),
        multiple: 1,
      },
    },
    {
      title: 'Machine Shop Name',
      dataIndex: 'machineShopName',
      sorter: {
        compare: commonSorter('machineShopName'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Shop Code',
      dataIndex: 'machineShopCode',
      sorter: {
        compare: commonSorter('machineShopCode'),
        multiple: 1,
      },
    },
    {
      title: 'No. of Lines',
      dataIndex: 'totalLines',
      sorter: {
        compare: commonSorter('totalLines'),
        multiple: 2,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="MachineShops"
          idName="machineShopId"
          idValue={record.machineShopId}
          status={record.status}
          url={service?.API_URL?.machineShop?.listing}
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
            onClick={() => handleEdit(record.machineShopId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button
            className="btn-outline"
          >
            {timeIcon}
          </Button>
          <DeleteModal id={record.machineShopId} deleteUrl={service?.API_URL?.machineShop?.listing} />
        </Flex>
      ),
    },
  ];

  const handleEdit = async (id: any) => {
    try {
      setMachineShopId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.machineShop.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
      } else {
        console.error('API call was not successful:', editMachineRes);
        // You can set some error state here if needed
      }
    } catch (error) {
    } finally {
    }
  };
  const onFinish = async (data: any) => {
    const body = {
      ...data,
      machineShopId: machineShopId || 0,
      isDelete: false,
    };

    if (machineShopId) {
      await updateData(
        body,
        service?.API_URL?.machineShop.update,
        form.resetFields()
      );
      setMachineShopId('');
    } else {
      await addData(
        body,
        service?.API_URL?.machineShop.add,
        form.resetFields()
      );
    }
  };

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      machineShopOf: service?.API_URL?.machineShopOf?.listing,
    };
    const enable = !!machineShopId;
    await getListData(apiUrls, enable);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setMachineShopId('');
    }
  }, [openAddModal]);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.machineShop[0])}
          url={service?.API_URL?.machineShop?.listing}
          exportUrl={service?.API_URL?.machineShop?.export}
        />
      ),
    },
  ];

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Machine Shop"
        exportUrl={service.API_URL.machineShop.export}
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <ImportFile
        importUrl={service?.API_URL?.machineShop.import}
        fetchUrl={service?.API_URL?.machineShop?.listing}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={machineShopId ? 'Edit Machine Shop' : 'Add Machine Shop'}
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
            <InputBox
              label="Machine Shop Name"
              name="machineShopName"
              required
              inputPlaceholder="Machine Shop Name"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />
            <InputBox
              label="Machine Code"
              name="machineShopCode"
              required
              inputPlaceholder="Machine Code"
              validateAsNumber={false}
              validateAsString={false}
              max={10}
            />

            <SelectBox
              label="Machine Shop Of"
              name="machineShopOfId"
              keyField="machineShopOfId"
              valueField="machineShopOfName"
              mode={false}
              required
              selectOptions={listData?.machineShopOf}
              // selectDefaultValue={['U3']}
              selectPlaceholder="Machine Shop Of"
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

      <TableComponent columns={columns} data={filterData || []} />
    </div>
  );
};

export default ManageMachineShop;
