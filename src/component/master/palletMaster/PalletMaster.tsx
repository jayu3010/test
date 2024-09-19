'use client';

import React, { useState, useEffect } from 'react';
import { Button, Collapse, Form, Popconfirm, Switch, Tag, Flex } from 'antd';
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
import ExportCSV from '@/component/exportCsv/ExportCSV';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const PalletMaster = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [palletId, setPalletId] = useState<any>();

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getQueryFetch }: any = useFetchData(
    service?.API_URL?.palletMaster.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.palletmasterFilter[0])}
          url={service?.API_URL?.palletMaster?.listing}
          exportUrl={service?.API_URL?.palletMaster?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Pallet Name',
      dataIndex: 'palletName',
      sorter: {
        compare: commonSorter('palletName'),
        multiple: 3,
      },
    },
    {
      title: 'Pallet Count',
      dataIndex: 'palletCount',
      sorter: (a, b) => a.palletCount - b.palletCount,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: any, record: any) => (
        <SwitchComponent
          masterName="Pallets"
          idName="palletId"
          idValue={record.palletId}
          status={value}
          url={service?.API_URL?.palletMaster?.listing}
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
            onClick={() => handleEdit(record.palletId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.palletId} deleteUrl={service?.API_URL?.palletMaster?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      ...data,
      palletId: palletId || 0,
      isDelete: false,
    };
    if (palletId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.palletMaster.update
      );
      if (updateDataRes?.apiStatus) {
        setPalletId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.palletMaster.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setPalletId(id);
      const queryParams = { palletId: id };
      const apiUrl = service.API_URL.palletMaster.getbyid;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes[0]);
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
  useEffect(() => {
    if (!openAddModal) {
      setPalletId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add  Pallet"
        exportUrl={service.API_URL.palletMaster.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={palletId ? 'Edit Pallet' : 'Add Pallet'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Pallet Name"
              name="palletName"
              required
              inputPlaceholder="Pallet Name"
              validateAsNumber={false}
              validateAsString={false}
            />

            <SelectBox
              label="Pallet Count"
              name="palletCount"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '4', label: '4' },
                { value: '6', label: '6' },
              ]}
              selectPlaceholder="Pallet Count"
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

export default PalletMaster;
