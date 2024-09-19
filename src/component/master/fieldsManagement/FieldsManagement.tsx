'use client';

import React from 'react';
import { Button, Flex, Popconfirm } from 'antd';

import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import { dltIcon, editIcon } from '@/utils/icons/icons';

const FieldsManagement = () => {
  const columns1 = [
    {
      title: 'Form Name',
      dataIndex: 'FormName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button className="btn-outline">{editIcon}</Button>
          <Popconfirm title="Sure to delete?" className="btn-outline">
            <Button> {dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const usersData = [
    {
      key: 1,
      SrNo: 1,
      FormName: 'Machine Shop',
    },
    {
      key: 2,
      SrNo: 2,
      FormName: 'Line',
    },
    {
      key: 3,
      SrNo: 3,
      FormName: 'Machine Main Category',
    },
    {
      key: 4,
      SrNo: 4,
      FormName: 'Machine Sub Category',
    },
    {
      key: 5,
      SrNo: 5,
      FormName: 'Work Center',
    },
    {
      key: 6,
      SrNo: 6,
      FormName: 'Machine Make',
    },
    {
      key: 7,
      SrNo: 7,
      FormName: 'Machine',
    },
  ];

  const columns2 = [
    {
      title: 'FieldName',
      dataIndex: 'FieldName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button className="btn-outline">{editIcon}</Button>
          <Popconfirm title="Sure to delete?" className="btn-outline">
            <Button> {dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const rolesData = [
    {
      key: 1,
      FieldName: 'Technical Support',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 2,
      FieldName: 'Production Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 3,
      FieldName: 'Mechanical Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 4,
      FieldName: 'Production Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 5,
      FieldName: 'Management Engineer',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 6,
      FieldName: 'Production General Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 7,
      FieldName: 'HRD',
      Action: 'actions', // Placeholder for action icons
    },
  ];

  const columns3 = [
    {
      title: 'Module Name',
      dataIndex: 'ModuleName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button className="btn-outline">{editIcon}</Button>
          <Popconfirm title="Sure to delete?" className="btn-outline">
            <Button> {dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const moduleData = [
    {
      key: 1,
      ModuleName: 'Masters',
    },
    {
      key: 2,
      ModuleName: 'Machine Parts and Routing',
    },
    {
      key: 3,
      ModuleName: 'Machine Shop Planning',
    },
  ];

  return (
    <>
      <CommonHeader breadCum="Fields Management" />
      <div className="text-right mt-5">
        <Button type="primary" htmlType="submit" className="btn-main">
          Update
        </Button>
      </div>
      <div className="field-management-table">
        <div className="text-center">Select Module</div>
        <TableComponent columns={columns3} data={moduleData} />
      </div>

      <div className="flex field-management-main mt-4">
        <div className="management-table w-full">
          <div className="text-center">Select Form</div>
          <TableComponent columns={columns1} data={usersData} />
        </div>

        <div className="management-table w-full">
          <div className="text-center">Select Fields</div>
          <TableComponent columns={columns2} data={rolesData} />
        </div>
      </div>
    </>
  );
};

export default FieldsManagement;
