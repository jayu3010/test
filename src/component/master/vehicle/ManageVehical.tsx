'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Select,
  Switch,
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
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageVehical = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [vehicleId, setVehicleId] = useState<any>();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const {
    addData,
    listData,
    getListData,
    updateData,
    
    getQueryFetch,
  } = useFetchData(service?.API_URL?.vehicles.listing);

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.vehicleFilter[0])}
          url={service?.API_URL?.vehicles?.listing}
          exportUrl={service?.API_URL?.vehicles?.export}
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
      title: 'Vehicle Number',
      dataIndex: 'vehicleNumber',
      sorter: {
        compare: commonSorter('vehicleNumber'),
        multiple: 3,
      },
    },
    {
      title: 'Vehicle Name',
      dataIndex: 'vehicleName',
      sorter: {
        compare: commonSorter('vehicleName'),
        multiple: 3,
      },
    },

    {
      title: 'Loading Capacity',
      dataIndex: 'loadingCapacity',
      sorter: (a, b) => a.loadingCapacity - b.loadingCapacity,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="Vehicles"
          idName="vehicleId"
          idValue={record.vehicleId}
          status={record.status}
          url={service?.API_URL?.vehicles?.listing}
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
            onClick={() => handleEdit(record.vehicleId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.vehicleId} deleteUrl={service?.API_URL?.vehicles?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      vehicleId: vehicleId || 0,
      isDelete: false,
    };
    if (vehicleId) {
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.vehicles.update
      );
      if (updateDataRes?.apiStatus) {
        setVehicleId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.vehicles.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };
  const handleEdit = async (id: any) => {
    try {
      setVehicleId(id);
      const queryParams = { vehicleId: id };
      const apiUrl = service.API_URL.vehicles.listing;
      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        form.setFieldsValue(editMachineRes[0]);
        dispatch(openModal());
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
      employees: service?.API_URL?.employees?.listing,
      unitList: service?.API_URL?.unitList?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setVehicleId('');
    }
  }, [openAddModal]);
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Vehicle"
        exportUrl={service.API_URL.vehicles.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.vehicles.import}
        fetchUrl={service?.API_URL?.vehicles.listing}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={vehicleId ? 'Edit Vehicle' : 'Add Vehicle'}
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
              required
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
            />
            <InputBox
              label="Vehicle Number"
              name="vehicleNumber"
              required
              inputPlaceholder="Vehicle Number"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
            />
            <InputBox
              label="Vehicle Name"
              name="vehicleName"
              required
              inputPlaceholder="Vehicle Name"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />
            <InputBox
              label="Loading Capacity(K.G)"
              name="loadingCapacity"
              required
              inputPlaceholder="Loading Capacity"
              validateAsNumber
              validateAsString={false}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && Number(value) <= 0) {
                      return Promise.reject(
                        new Error(
                          'Loading Capacity must be a positive value greater than 0.'
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
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

export default ManageVehical;
