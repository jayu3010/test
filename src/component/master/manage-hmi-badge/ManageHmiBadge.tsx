'use client';

import React, { useState } from 'react';
import { Button, Collapse, Form, Popconfirm, Switch, Flex } from 'antd';
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
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageHmiBadge = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [hmiId, setHmiId] = useState<any>();
  const { addData, updateData,  getItemById }: any = useFetchData(
    service?.API_URL?.hmiBadgeList.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.hmiBudgeFilter[0])}
          url={service?.API_URL?.hmiBadgeList?.listing}
          exportUrl={service?.API_URL?.hmiBadgeList?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'HMI Badge Name',
      dataIndex: 'hmiBadgeName',
      sorter: {
        compare: commonSorter('hmiBadgeName'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="HMIBadges"
          idName="hmiBadgeId"
          idValue={record.hmiBadgeId}
          status={record.status}
          url={service?.API_URL?.hmiBadgeList?.listing}
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
            onClick={() => handleEdit(record.hmiBadgeId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.hmiBadgeId} deleteUrl={service?.API_URL?.hmiBadgeList?.listing} />
        </Flex>
      ),
    },
  ];
  const handleEdit = async (id: any) => {
    try {
      setHmiId(id);
      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.hmiBadgeList.getbyid
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
      hmiBadgeId: hmiId || 0,
      isDelete: false,
    };
    if (hmiId) {
      const updateDateRes = await updateData(
        body,
        service?.API_URL?.hmiBadgeList.update
      );
      if (updateDateRes?.apiStatus) {
        setHmiId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.hmiBadgeList.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  // const modalListing = async () => {
  //   const apiUrls = {
  //     machineShop: service?.API_URL?.machineShop?.listing,
  //   }
  //   await getListData(apiUrls)
  // }

  // useEffect(() => {
  //   if (openAddModal) {
  //     modalListing()
  //   }
  // }, [openAddModal])

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add HMI Badge"
        breadCum="Manage HMI Badge"
        exportUrl={service.API_URL.hmiBadgeList.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={hmiId ? 'Edit HMI Badge' : 'Add HMI Badge'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="HMI Badge Name"
              name="hmiBadgeName"
              required
              inputPlaceholder="HMI Badge Name"
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

export default ManageHmiBadge;
