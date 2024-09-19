'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'antd';
import { update } from 'lodash';

import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import SelectBox from '@/component/selectbox/selectbox';
import useFetchData from '@/utils/useFetchData/customFetchData';
import { loadIcon } from '@/utils/icons/icons';

const RolePermission = () => {
  const { listData, getListData }: any = useFetchData();
  const [workcenterArray, setWorkcenterArray] = useState([]);

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    const enable = true;
    await getListData(apiUrls, enable);
  };
  const columns1 = [
    {
      title: 'Form Visible',
      dataIndex: 'FormVisible',
      multiple: 10,
      render: (_: any) => (
        <Checkbox
          // key={}
          // value={}
          // disabled={}
          className="mb-2"
        />
      ),
    },
    {
      title: 'Form Name',
      dataIndex: 'FormName',
      multiple: 10,
    },
    {
      title: 'Parent Menu Name',
      dataIndex: 'ParentMenuName',
      multiple: 10,
    },
  ];

  const columns2 = [
    {
      title: 'Field Name',
      dataIndex: 'FieldName',
    },
    {
      title: 'View',
      dataIndex: 'View',
      render: (_: any) => (
        <Checkbox
          // key={}
          // value={}
          // disabled={}
          className="mb-2"
        />
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      render: (_: any) => (
        <Checkbox
          // key={}
          // value={}
          // disabled={}
          className="mb-2"
        />
      ),
    },
  ];
  const rolesData = [
    {
      key: 1,
      FormVisible: true, // Checkbox checked
      FormName: 'Machine Shop',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 2,
      FormVisible: true, // Checkbox checked
      FormName: 'Line',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 3,
      FormVisible: true, // Checkbox checked
      FormName: 'Machine Main Category',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 4,
      FormVisible: true, // Checkbox checked
      FormName: 'Machine Sub Category',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 5,
      FormVisible: true, // Checkbox checked
      FormName: 'Work Center',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 6,
      FormVisible: true, // Checkbox checked
      FormName: 'Machine Make',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 7,
      FormVisible: true, // Checkbox checked
      FormName: 'Machine',
      ParentMenuName: 'Parent Menu Name',
    },
    {
      key: 8,
      FormVisible: true, // Checkbox checked
      FormName: 'Cell',
      ParentMenuName: 'Parent Menu Name',
    },
  ];
  const fieldsData = [
    {
      key: 1,
      SrNo: 1,
      FieldName: 'Machine Shop',
      View: true,
      Edit: true,
    },
    {
      key: 2,
      SrNo: 2,
      FieldName: 'Line',
      View: true,
      Edit: true,
    },
    {
      key: 3,
      SrNo: 3,
      FieldName: 'Work Center',
      View: true,
      Edit: true,
    },
    {
      key: 4,
      SrNo: 4,
      FieldName: 'Machine Modal',
      View: true,
      Edit: true,
    },
    {
      key: 5,
      SrNo: 5,
      FieldName: 'Machine Sr. No.',
      View: true,
      Edit: true,
    },
    {
      key: 6,
      SrNo: 6,
      FieldName: 'Installation Date',
      View: true,
      Edit: true,
    },
    {
      key: 7,
      SrNo: 7,
      FieldName: 'Controller Software Ver.',
      View: true,
      Edit: true,
    },
    {
      key: 8,
      SrNo: 8,
      FieldName: 'Status',
      View: true,
      Edit: true,
    },
  ];

  return (
    <>
      <CommonHeader breadCum="Role Permission" />
      <div className="block-top-permission">
        <Form className="flex w-full">
          <SelectBox
            label="Role Code"
            name="rolecode"
            keyField="value"
            valueField="label"
            mode={false}
            required
            selectOptions={[{ value: 'PRDTL', label: 'PRDTL' }]}
            selectPlaceholder="PRDTL"
            handleMultiSelectChange={(value: any) => handleCountryChange(value)}
          />
          <SelectBox
            label="Module name"
            name="modulename"
            keyField="value"
            valueField="label"
            mode={false}
            required
            selectOptions={[{ value: 'Master', label: 'Master' }]}
            selectPlaceholder="Master"
            handleMultiSelectChange={(value: any) => handleCountryChange(value)}
          />
          <Button type="primary" htmlType="submit" className="btn-main">
            {' '}
            Update
          </Button>
        </Form>
      </div>
      <div className="flex role-permission-main mt-4">
        <TableComponent columns={columns1} data={rolesData} />
        <div className="table-devider" />
        <TableComponent columns={columns2} data={fieldsData} />
      </div>
    </>
  );
};

export default RolePermission;
