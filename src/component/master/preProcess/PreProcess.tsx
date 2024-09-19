'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Collapse, Form, Popconfirm, Switch, Flex, Input } from 'antd';
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

const PreProcess = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [processId, setProcessId] = useState('');

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    updateData,
    addData,
    listData,
    
    getQueryFetch,
    getListData,
  } = useFetchData(service?.API_URL?.preProcesses.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.preProcessFilter[0])}
          url={service?.API_URL?.preProcesses?.listing}
          exportUrl={service?.API_URL?.preProcesses?.export}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: {
        compare: commonSorter('description'),
        multiple: 3,
      },
    },
    {
      title: 'Short Form',
      dataIndex: 'shortForm',
      sorter: {
        compare: commonSorter('shortForm'),
        multiple: 3,
      },
    },
    {
      title: 'Material Code',
      dataIndex: 'materialCode',
      sorter: {
        compare: commonSorter('materialCode'),
        multiple: 3,
      },
    },
    {
      title: 'BUN',
      dataIndex: 'bun',
      sorter: {
        compare: commonSorter('bun'),
        multiple: 3,
      },
    },
    {
      title: 'Procurement Type',
      dataIndex: 'procurementType',
      sorter: {
        compare: commonSorter('procurementType'),
        multiple: 3,
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="PreProcesses"
          idName="preProcessId"
          idValue={record.preProcessId}
          status={record.status}
          url={service?.API_URL?.preProcesses?.listing}
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
            onClick={() => handleEdit(record.preProcessId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.preProcessId} deleteUrl={service?.API_URL?.preProcesses?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      ...data,
      preProcessId: processId || 0,
      isDelete: false,
    };
    if (processId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.preProcesses.update
      );
      if (updateDataRes?.apiStatus) {
        setProcessId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        body,
        service?.API_URL?.preProcesses.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setProcessId(id);
      const queryParams = { preProcessId: id };
      const apiUrl = service.API_URL.preProcesses.getbyid;

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
  const modalListing = async () => {
    const apiUrls = {
      materials: service?.API_URL?.materialsCode?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setProcessId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Pre Process"
        exportUrl={service.API_URL.preProcesses.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={processId ? 'Edit Pre Process' : 'Add Pre Process'}
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
                mode={false}
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Select Unit"
              /> */}

            <InputBox
              label="Description"
              name="description"
              required
              inputPlaceholder="Description"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <InputBox
              label="Short Form"
              name="shortForm"
              required
              inputPlaceholder="Short Form"
              validateAsNumber={false}
              validateAsString={false}
              max={5}
            />

            <SelectBox
              label="Material Code"
              name="materialId"
              keyField="materialId"
              valueField="materialCode"
              mode={false}
              required
              selectOptions={listData.materials}
              selectPlaceholder="Material Code"
            />

            <Form.Item
              label="BUN"
              name="bun"
              rules={[
                {
                  pattern: /^[a-z]{1,5}$/,
                  message:
                    'Please enter between 1 and 5 lowercase letters without numbers.',
                },
                {
                  required: true,
                  message: 'This field is required',
                },
              ]}
              className="form-item"
            >
              <Input
                placeholder="BUN"
                className="form-input"
                type="text"
                maxLength={5}
              />
            </Form.Item>

            <SelectBox
              label="Procurement Type"
              name="procurementType"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: 'Inhouse', label: 'Inhouse' },
                { value: 'Process', label: 'Process' },
                { value: 'Purchase', label: 'Purchase' },
              ]}
              selectPlaceholder="Procurement Type"
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

export default PreProcess;
