'use client';

import React, { useState, useEffect } from 'react';
import { Button, Form, Popconfirm, Switch, Flex, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';

import CommonForm from '@/app/layout/commonForm/commonForm';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import {
  batchTransformData,
  commonSorter,
} from '@/utils/functions/commonFunction';

const BatchTiming = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const dispatch = useDispatch();
  const [batchTimeId, setBatchTimeId] = useState<any>();
  const [batchArray, setBatchArray] = useState([]);

  const [batchTimeArray, setBatchTimeArray] = useState<any>([
    {
      batchTimeSchedulingShifts: [
        { startBeforeTime: 30, shiftId: 1, shiftName: 'Shift A' },
        { startBeforeTime: 300, shiftId: 2, shiftName: 'Shift B' },
      ],
    },
  ]);
  const [form] = Form.useForm();
  const {
    getQueryFetch,
    listData,
    getListData,
    updateData,
    addData,
    
    getItemById,
  } = useFetchData(service.API_URL.batchTimeScheduling.listing);

  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
    },
    {
      title: 'Scheduler',
      dataIndex: 'schedulerName1',
    },
    {
      title: 'Optimizer',
      dataIndex: 'schedulerName2',
    },
    {
      title: 'Shift',
      dataIndex: 'shiftName',
      render: (_: any, record: any) => (
        <>
          {record?.batchTimeSchedulingShifts?.map((v: any) => {
            return (
              <>
                {v?.shiftName}
                <br />
                <br />
              </>
            );
          })}
        </>
      ),
    },
    {
      title: 'Run Before (Min)',
      dataIndex: 'shiftName',
      render: (_: any, record: any) => (
        <>
          {record?.batchTimeSchedulingShifts?.map((v: any) => {
            return (
              <>
                {`${v?.startBeforeTime} Min`}
                <br />
                <br />
              </>
            );
          })}
        </>
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
            onClick={() => handleEdit(record.unitId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = batchTransformData(data, batchArray);

    if (batchTimeId) {
      const UpdateDataRes = await updateData(
        body,
        service?.API_URL?.batchTimeScheduling.update
      );
      if (UpdateDataRes.apiStatus) {
        form.resetFields();
        setBatchTimeId('');
      }
    }
  };

  const handleEdit = async (id: any) => {
    try {
      setBatchTimeId(id);
      const apiUrl = service.API_URL.batchTimeScheduling.getbyid;

      const editMachineRes = await getItemById(
        id,
        service.API_URL.batchTimeScheduling.getbyid
      );
      if (editMachineRes) {
        // console.log("jjjj",listData?.schedulers)

        form.setFieldValue('schedulerId2', editMachineRes[0].schedulerId2);
        form.setFieldValue('schedulerId1', editMachineRes[0].schedulerId1);

        setBatchTimeArray(editMachineRes[0]);
        setBatchArray(editMachineRes[0]);

        dispatch(openModal());
        form.setFieldsValue(editMachineRes[0]);
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes);
        // You can set some error state here if needed
      }
    } catch (error) {
    } finally {
    }
    // Perform your edit actions here
  };
  const modalListing = async () => {
    try {
      const apiUrls = {
        schedulers: service?.API_URL?.batchTimeScheduling?.schedulers,
        unitList: service?.API_URL?.unitList?.listing,
      };
      await getListData(apiUrls);
    } catch (error) {
      console.error('Error fetching common data:', error);
    }
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setBatchTimeId('');
    }
  }, [openAddModal]);

  return (
    <div className="batchtime-fields">
      <CommonHeader breadCum="Manage Batch Time Scheduling" />
      <CommonForm
        open={openAddModal}
        mdlTitle={
          batchTimeId
            ? 'Manage Batch Time Scheduling'
            : 'Manage Batch Time Scheduling'
        }
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
              required={false}
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
              disabled
            />
            <SelectBox
              label="Scheduler"
              name="schedulerId1"
              keyField="schedulerId"
              valueField="schedulerName"
              mode={false}
              required
              selectOptions={listData?.schedulers?.filter(
                (item: any) => item.optimizer === false
              )}
              selectPlaceholder="Select Shift"
            />
            <SelectBox
              label="Optimizer"
              name="schedulerId2"
              keyField="schedulerId"
              valueField="schedulerName"
              mode={false}
              required={false}
              selectOptions={listData?.schedulers?.filter(
                (item: any) => item.optimizer === true
              )}
              selectPlaceholder="Select Shift"
            />
            <div />
            {batchTimeArray.batchTimeSchedulingShifts?.length > 0
              ? batchTimeArray?.batchTimeSchedulingShifts?.map(
                  (v: any, i: any) => (
                    <>
                      <div className="flex items-center gap-5" key={i}>
                        <InputBox
                          label="Minutes"
                          name={[
                            'batchTimeSchedulingShifts',
                            i,
                            'startBeforeTime',
                          ]}
                          required
                          inputPlaceholder="Minutes"
                          validateAsNumber
                          validateAsString={false}
                          inputDefaultValue={v.startBeforeTime}
                          rules={[
                            {
                              validator: (_: any, value: any) => {
                                if (value) {
                                  const numberValue = Number(value);

                                  // Check if the value is an integer and greater than 0
                                  if (
                                    !Number.isInteger(numberValue) ||
                                    numberValue <= 0
                                  ) {
                                    return Promise.reject(
                                      new Error('allow only numbers value')
                                    );
                                  }
                                  if (numberValue > 1439) {
                                    return Promise.reject(
                                      new Error('Please Enter Valid Minutes')
                                    );
                                  }
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        />
                        <span className="mt-5">Before</span>

                        <InputBox
                          label="Shift"
                          name={['batchTimeSchedulingShifts', i, 'shiftName']}
                          required={false}
                          inputPlaceholder="Shift"
                          validateAsNumber={false}
                          validateAsString={false}
                          inputDefaultValue={v.shiftName}
                          disabled
                        />
                      </div>
                      <div />
                    </>
                  )
                )
              : ''}
          </div>
        }
      />
      {/* <div className='block-main__filter border-y-[1px] border-border py-4'>
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div> */}
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default BatchTiming;
