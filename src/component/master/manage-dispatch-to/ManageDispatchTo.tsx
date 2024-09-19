'use client';

import React, { useState } from 'react';
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
import { openModal } from '@/utils/redux/features/reduxData';
import InputBox from '@/component/input/Input';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageDispatchTo = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [dispatchToId, setDispatchToId] = useState<any>();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { loading, error, addData, updateData, getItemById } =
    useFetchData(service?.API_URL?.dispatchTo.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageDispatch[0])}
          url={service?.API_URL?.dispatchTo?.listing}
          exportUrl={service?.API_URL?.dispatchTo?.export}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Dispatch To',
      dataIndex: 'locationName',
      sorter: {
        compare: commonSorter('locationName'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="DispatchTos"
          idName="dispatchToId"
          idValue={record.dispatchToId}
          status={record.status}
          url={service?.API_URL?.dispatchTo?.listing}
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
            onClick={() => handleEdit(record.dispatchToId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.dispatchToId} deleteUrl={service?.API_URL?.dispatchTo?.listing} />

        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setDispatchToId(id);

      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.dispatchTo.getbyid
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
      dispatchToId: dispatchToId || 0,
      ...data,
    };
    if (dispatchToId) {
      await updateData(
        body,
        service?.API_URL?.dispatchTo.update,
        form.resetFields()
      );
      setDispatchToId('');
    } else {
      await addData(body, service?.API_URL?.dispatchTo.add, form.resetFields());
    }
  };
  //   const modalListing = async () => {
  //     const apiUrls = {
  //       unitList: service?.API_URL?.unitList?.listing,
  //     }
  //     await getListData(apiUrls)
  //   }

  //   useEffect(() => {
  //     if (openAddModal) {
  //       modalListing()
  //     }
  //   }, [openAddModal])
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Dispatch To"
        exportUrl={service.API_URL.dispatchTo.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={dispatchToId ? 'Edit Dispatch To' : 'Add Dispatch To'}
        btnSubmit="Save"
        initialValues={{ status: false }}
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Dispatch Name"
              name="locationName"
              required
              inputPlaceholder="Dispatch Name"
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
      <TableComponent columns={columns} data={filterData || []} />
    </div>
  );
};

export default ManageDispatchTo;
