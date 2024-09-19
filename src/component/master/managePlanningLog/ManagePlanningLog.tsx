'use client';

import React, { useState } from 'react';
import { Button, Collapse, Form, Popconfirm, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import CommonForm from '@/app/layout/commonForm/commonForm';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import Datepicker from '@/component/commondatepicker/datepicker';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';

import ImageUpload from './Image';

const ManagePlanningLog = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [planningLogId, setPlanningLogId] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { addData, updateData,  getItemById }: any = useFetchData(
    service?.API_URL?.planningLogs.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.planningLogFilter[0])}
          url={service?.API_URL?.planningLogs?.listing}
          exportUrl={service?.API_URL?.planningLogs?.export}
        />
      ),
    },
  ];

  function base64ToBlob(base64: any, mimeType: any) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  function generateDownloadUrl(base64: any, mimeType: any) {
    const blob = base64ToBlob(base64, mimeType);
    return URL.createObjectURL(blob);
  }
  const handleDownload = (base64: any, fileName: any, mimeType: any) => {
    const downloadUrl = generateDownloadUrl(base64, mimeType);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
      title: 'Planning Type',
      dataIndex: 'planningType',
      sorter: {
        compare: commonSorter('planningType'),
        multiple: 3,
      },
    },
    {
      title: 'Call Type',
      dataIndex: 'callType',
      sorter: {
        compare: commonSorter('callType'),
        multiple: 3,
      },
    },
    {
      title: 'Done By',
      dataIndex: 'doneById',
      sorter: {
        compare: commonSorter('doneById'),
        multiple: 3,
      },
    },
    {
      title: 'Start Date and Time',
      dataIndex: 'startDateTime',
      sorter: {
        compare: commonSorter('startDateTime'),
        multiple: 3,
      },
    },
    {
      title: 'End Date and Time',
      dataIndex: 'endDateTime',
      sorter: {
        compare: commonSorter('endDateTime'),
        multiple: 3,
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      sorter: {
        compare: commonSorter('duration'),
        multiple: 3,
      },
    },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      render: (_: any, record: any) => (
        <svg
          width="1.3em"
          height="1.3em"
          className="cursor-pointer"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() =>
            handleDownload(
              record.filePath,
              record.callType,
              'application/octet-stream'
            )
          }
        >
          <path d="M14.853 9.647c-0.195-0.195-0.512-0.195-0.707 0l-4.146 4.146v-11.293c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v11.293l-4.146-4.146c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5 5c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.147l5-5c0.195-0.195 0.195-0.512-0-0.707z" />
          <path d="M17.5 19h-16c-0.827 0-1.5-0.673-1.5-1.5v-2c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5h16c0.276 0 0.5-0.224 0.5-0.5v-2c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v2c0 0.827-0.673 1.5-1.5 1.5z" />
        </svg>
      ),
      sorter: (a: any, b: any) => a.filePath.localeCompare(b.filePath),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    console.log('fgfgfg', data);

    const startDateTime = data.startDateTime
      ? data.startDateTime.format('YYYY-MM-DD')
      : null;
    const endDateTime = data.endDateTime
      ? data.endDateTime.format('YYYY-MM-DD')
      : null;

    const formData: any = new FormData();
    formData.append('planningType', data.planningType);
    formData.append('callType', data.callType);
    formData.append('file', imageUrl);
    formData.append('startDateTime', startDateTime);
    formData.append('endDateTime', endDateTime);
    formData.append('doneById', data.doneById);
    formData.append('status', data.status ? data.status : false);
    formData.append('planningLogId', planningLogId || 0);
    formData.append('isDelete', false);

    if (planningLogId) {
      const updateDataRes = await updateData(
        formData,
        service?.API_URL?.planningLogs?.update
      );
      if (updateDataRes?.apiStatus) {
        setPlanningLogId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(
        formData,
        service?.API_URL?.planningLogs?.add
      );
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setPlanningLogId(id);

      const editMachineRes: any = await getItemById(
        id,
        service.API_URL.planningLogs.getbyid
      );
      if (editMachineRes) {
        dispatch(openModal());
        form.setFieldsValue(editMachineRes);
      } else {
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
  return (
    <div>
      <CommonHeader exportUrl={service.API_URL.planningLogs.export} />
      <CommonForm
        open={openAddModal}
        mdlTitle={planningLogId ? 'Edit Planing Log' : 'Add Planing Log'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Planning Type"
              name="planningType"
              required
              inputPlaceholder="Planning Type"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />

            <InputBox
              label="Call Type"
              name="callType"
              required
              inputPlaceholder="Call Type"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />

            <ImageUpload setImageUrl={setImageUrl} />

            <Datepicker
              label="Start Date and Time"
              name="startDateTime"
              className="date-picker"
              required
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select Date"
            />

            <Datepicker
              label="End Date and Time"
              name="endDateTime"
              className="date-picker"
              required
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select Date"
            />

            <InputBox
              label="Done By"
              name="doneById"
              required
              inputPlaceholder="Done By"
              validateAsNumber={false}
              validateAsString={false}
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

export default ManagePlanningLog;
