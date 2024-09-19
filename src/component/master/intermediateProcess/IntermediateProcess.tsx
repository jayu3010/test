'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Switch,
  TimePicker,
  Flex,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

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

const IntermediateProcess = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [intermediateId, setIntermediateId] = useState('');
  const [distPatchTime, setDistPatchTime] = useState({
    dispatchStartTime: '',
    dispatchEndTime: '',
  });
  const dispatch = useDispatch();

  const [form]: any = Form.useForm();
  const {
    addData,
    updateData,
    
    getQueryFetch,
    getListData,
    listData,
  } = useFetchData(service?.API_URL?.interMediateProcesses.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.intermediateFilter[0])}
          url={service?.API_URL?.interMediateProcesses?.listing}
          exportUrl={service?.API_URL?.interMediateProcesses?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Process name',
      dataIndex: 'processName',
      sorter: {
        compare: commonSorter('processName'),
        multiple: 3,
      },
    },
    {
      title: 'Process code',
      dataIndex: 'processCode',
      sorter: {
        compare: commonSorter('processCode'),
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
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="IntermediateProcess"
          idName="iProcessId"
          idValue={record.iProcessId}
          status={record.status}
          url={service?.API_URL?.interMediateProcesses?.listing}
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
            onClick={() => handleEdit(record.iProcessId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.iProcessId} deleteUrl={service?.API_URL?.interMediateProcesses?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      iProcessId: intermediateId || 0,
      dispatchStartTime: distPatchTime.dispatchStartTime,
      dispatchEndTime: distPatchTime.dispatchEndTime,
      isDelete: false,
    };
    if (intermediateId) {
      await updateData(
        body,
        service?.API_URL?.interMediateProcesses.update,
        form.resetFields()
      );
      setIntermediateId('');
    } else {
      await addData(
        body,
        service?.API_URL?.interMediateProcesses.add,
        form.resetFields()
      );
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setIntermediateId(id);
      const queryParams = { iProcessId: id };
      const apiUrl = service.API_URL.interMediateProcesses.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());

        if (editMachineRes) {
          const dataWithMomentDates = {
            ...editMachineRes[0],

            dispatchStartTime: editMachineRes[0].dispatchStartTime
              ? dayjs(editMachineRes[0].dispatchStartTime, 'HH:mm:ss')
              : null,
            dispatchEndTime: editMachineRes[0].dispatchEndTime
              ? dayjs(editMachineRes[0].dispatchEndTime, 'HH:mm:ss')
              : null,
          };
          form.setFieldsValue(dataWithMomentDates);
        }
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    }
    // Perform your edit actions here
  };
  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      materials: service?.API_URL?.materialsCode?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setIntermediateId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Intermediate Process"
        exportUrl={service.API_URL.interMediateProcesses.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          intermediateId
            ? 'Edit Intermediate Process'
            : 'Add Intermediate Process'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Process Name"
              name="processName"
              required
              inputPlaceholder="Process Name"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <InputBox
              label="Process Code"
              name="processCode"
              required
              inputPlaceholder="Process Code"
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
              selectOptions={listData?.materials}
              selectPlaceholder="Material Code"
            />

            <InputBox
              label="Purchase Order Text"
              name="poText"
              required
              inputPlaceholder="Purchase Order Text"
              validateAsNumber={false}
              validateAsString={false}
              max={300}
            />

            <SelectBox
              label="Procurement Type"
              name="procurementType"
              keyField="value"
              valueField="label"
              mode={false}
              required
              selectOptions={[
                { value: '1', label: 'Inhouse' },
                { value: '2', label: 'Process' },
                { value: '3', label: 'Purchase' },
              ]}
              selectPlaceholder="Procurement Type"
            />

            <InputBox
              label="Vendors"
              name="vendors"
              required
              inputPlaceholder="Vendors"
              validateAsNumber={false}
              validateAsString={false}
            />

            <Form.Item
              label="Start Time"
              name="dispatchStartTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker
                format="HH:mm:ss"
                className="date-picker"
                value={dayjs(distPatchTime.dispatchStartTime)}
                onChange={(time, timeString) => {
                  setDistPatchTime({
                    ...distPatchTime,
                    dispatchStartTime: timeString,
                  });
                  form.setFieldsValue({ dispatchStartTime: time });
                }}
              />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="dispatchEndTime"
              className="form-item"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <TimePicker
                format="HH:mm:ss"
                className="date-picker"
                value={dayjs(distPatchTime.dispatchEndTime)}
                onChange={(time, timeString) => {
                  setDistPatchTime({
                    ...distPatchTime,
                    dispatchEndTime: timeString,
                  });
                  form.setFieldsValue({ dispatchEndTime: time });
                }}
              />
            </Form.Item>

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

export default IntermediateProcess;
