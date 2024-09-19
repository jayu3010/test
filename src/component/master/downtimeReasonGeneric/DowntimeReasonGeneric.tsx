'use client'

import React, { useState, useEffect } from 'react'

import { Button, Collapse, Form, Popconfirm, Switch, Tag, Flex } from 'antd'
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
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const DowntimeReasonGeneric = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const [downTimeReasonCat, setDownTimeReasonCat] = useState('');

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    updateData,
    getListData,
    listData,
    getQueryFetch,
    
  }: any = useFetchData(service?.API_URL?.downTimeReason.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageDowntownReason[0])}
          url={service?.API_URL?.downTimeReason?.listing}
          exportUrl={service?.API_URL?.downTimeReason?.export}
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
      title: 'Downtime Reason',
      dataIndex: 'downtimeReason',
      sorter: {
        compare: commonSorter('downtimeReason'),
        multiple: 3,
      },
    },
    {
      title: 'Code',
      dataIndex: 'downtimeReasonCode',
      sorter: {
        compare: commonSorter('downtimeReasonCode'),
        multiple: 3,
      },
    },
    {
      title: 'Downtime Category',
      dataIndex: 'downTimeCategory',
      sorter: {
        compare: commonSorter('downTimeCategory'),
        multiple: 3,
      },
    },
    {
      title: 'Down work center',
      dataIndex: 'downWorkCenter',
      render: (_, record: any) => (
        <>
          <Form.Item name="downWorkCenter" className="form-item">
            <Switch checked={record.downWorkCenter} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="downtimeCategoryReasons"
            idName="downtimeCategoryReasonId"
            idValue={record.downtimeCategoryReasonId}
            status={record.status}
            url={service?.API_URL?.downTimeReason?.listing}
          />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <>
          <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.downtimeCategoryReasonId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.downtimeCategoryReasonId} deleteUrl={service?.API_URL?.downTimeReason?.listing} />
          </Flex>
        </>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,

      downtimeCategoryReasonId: downTimeReasonCat || 0,
      isDelete: false,
    };
    if (downTimeReasonCat) {
      const updateDateRes = await updateData(body, service?.API_URL?.downTimeReason.update)
      if (updateDateRes?.apiStatus) {
        setDownTimeReasonCat('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.downTimeReason.add)
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setDownTimeReasonCat(id);
      const queryParams = { downtimeCategoryReasonId: id };
      const apiUrl = service.API_URL.downTimeReason.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        dispatch(openModal());
        const units = editMachineRes[0]?.units?.map((unit) => unit.unitId);
        form.setFieldsValue(editMachineRes[0]);
        form.setFieldsValue({ unitIds: units });
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
      downTimeCategory: service?.API_URL?.downTimeCategory.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setDownTimeReasonCat('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Reason Generic"
        exportUrl={service.API_URL.downTimeReason.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.downTimeReason.import}
        fetchUrl={service?.API_URL?.downTimeReason.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={
          downTimeReasonCat ? 'Edit Reason Generic' : 'Add Reason Generic'
        }
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <SelectBox
                label="Unit Name"
                name="unitIds"
                keyField="unitId"
                valueField="unitName"
                mode={true}
                required={true}
                selectOptions={listData?.unitList}
                selectPlaceholder="Select Unit"
              />
              <SelectBox
                label="Downtime Category"
                name="downtimeCategoryId"
                keyField="downtimeCategoryId"
                valueField="downtimeCategoryName"
                mode={false}
                required={true}
                selectOptions={listData?.downTimeCategory}
                selectPlaceholder="Select Downtime Category"
              />

              <InputBox
                label="Downtime Reason"
                name="downtimeReason"
                required={true}
                inputPlaceholder="Downtime Reason"
                validateAsNumber={false}
                validateAsString={false}
                max={50}
              />

              <InputBox
                label="Code"
                name="downtimeReasonCode"
                required={true}
                inputPlaceholder="Code"
                validateAsNumber={false}
                validateAsString={false}
                max={10}
              />

              <div className='grid grid-cols-2'>

                <CommonSwitch
                  label="Down work center"
                  name="downWorkCenter"
                  checkedChildren="Active"
                  unCheckedChildren="InActive"
                />

                <CommonSwitch
                  label="Status"
                  name="status"
                  checkedChildren="Active"
                  unCheckedChildren="InActive"
                />

              </div>
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

export default DowntimeReasonGeneric;
