'use client';

import React, { useState, useEffect } from 'react';
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
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import InputBox from '@/component/input/Input';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const UnplannedProductionReason = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [unplnReasonId, setUnplnReasonId] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {  addData, updateData, getListData, getQueryFetch } =
    useFetchData(service?.API_URL?.unPlannedprdReasons.listing);
  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(
            filterOptiondata.ManageUnplannedProductionReason[0]
          )}
          url={service?.API_URL?.unPlannedprdReasons?.listing}
          exportUrl={service?.API_URL?.unPlannedprdReasons?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Unplanned Production Reason',
      dataIndex: 'reason',
      sorter: {
        compare: commonSorter('reason'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="UnplannedPrdReasons"
          idName="unplannedPrdReasonId"
          idValue={record.unplannedPrdReasonId}
          status={record.status}
          url={service?.API_URL?.unPlannedprdReasons.listing}
        />
      ),
    },
    {
      title: 'Action',
      width: 150,
      fixed: 'right',
      dataIndex: 'action',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.unplannedPrdReasonId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.unplannedPrdReasonId} deleteUrl={service?.API_URL?.unPlannedprdReasons?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      unplannedPrdReasonId: unplnReasonId || 0,
      isDelete: false,
    };
    if (unplnReasonId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.unPlannedprdReasons.update
      );
      if (updateDataRes?.apiStatus) {
        setUnplnReasonId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.unPlannedprdReasons.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setUnplnReasonId(id);
      const queryParams = { unplannedPrdReasonId: id };
      const apiUrl = service.API_URL.unPlannedprdReasons.listing;

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
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setUnplnReasonId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Unplanned Production Reason"
        exportUrl={service.API_URL.unPlannedprdReasons.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          unplnReasonId
            ? 'Edit Unplanned Production Reason'
            : 'Add Unplanned Production Reason'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Unplanned Production Reason"
              name="reason"
              required
              inputPlaceholder="Unplanned Production Reason"
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

export default UnplannedProductionReason;
