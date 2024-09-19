'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Flex,
  Select,
  Switch,
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
import ImportFile from '@/component/fileUpload/ImportFile';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageLine = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [machineLineId, setMachineLineId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    getItemById,
    updateData,
    getListData,
    
    listData,
  }: any = useFetchData(service?.API_URL?.lineList?.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.machineLine[0])}
          url={service?.API_URL?.lineList?.listing}
          exportUrl={service?.API_URL?.lineList?.export}
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
        multiple: 3,
      },
    },

    {
      title: 'Line Name',
      dataIndex: 'lineName',
      sorter: {
        compare: commonSorter('lineName'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="Lines"
          idName="lineId"
          idValue={record.lineId}
          status={record.status}
          url={service?.API_URL?.lineList?.listing}
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
            onClick={() => handleEdit(record.lineId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.lineId} deleteUrl={service?.API_URL?.lineList?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setMachineLineId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.lineList.getbyid
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
  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      lineId: machineLineId || 0,
      isDelete: false,
    };
    if (machineLineId) {
      await updateData(
        body,
        service?.API_URL?.lineList.update,
        form.resetFields()
      );
      setMachineLineId('');
    } else {
      await addData(body, service?.API_URL?.lineList.add, form.resetFields());
    }
  };
  const modalListing = async () => {
    const apiUrls = {
      machineShop: service?.API_URL?.machineShop?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setMachineLineId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Line"
        exportUrl={service.API_URL.lineList.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.lineList.import}
        fetchUrl={service?.API_URL?.lineList.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={machineLineId ? 'Edit Line' : 'Add Line'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <SelectBox
              label="Machine Shop"
              name="machineShopId"
              keyField="machineShopId"
              valueField="machineShopName"
              mode={false}
              required
              selectOptions={listData?.machineShop}
              selectPlaceholder="Machine Shop"
            />

            <InputBox
              label="Line Name"
              name="lineName"
              required
              inputPlaceholder="Line Name"
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

export default ManageLine;
