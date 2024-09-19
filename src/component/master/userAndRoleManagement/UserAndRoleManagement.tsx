'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Flex, Form, Popconfirm } from 'antd';
import { update } from 'lodash';

import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import SelectBox from '@/component/selectbox/selectbox';
import useFetchData from '@/utils/useFetchData/customFetchData';
import {
  addIcon,
  dltIcon,
  editIcon,
  loadIcon,
  timeIcon,
} from '@/utils/icons/icons';

const UserAndRoleManagement = () => {
  const { getListData }: any = useFetchData();

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    const enable = true;
    await getListData(apiUrls, enable);
  };
  const columns1 = [
    {
      title: 'User Name',
      dataIndex: 'UserName',
    },
    {
      title: 'Person Name',
      dataIndex: 'PersonName',
      width: 90,
    },
    {
      title: 'Unit Code',
      dataIndex: 'UnitCode',
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      width: 160,
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      width: 90,
    },
    {
      title: 'Role Code',
      dataIndex: 'RoleCode',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <Popconfirm
            title="Sure to delete?"
            className="btn-outline"
          >
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
      UserName: 'USR001',
      PersonName: 'Person 1',
      UnitCode: 'Unite 1',
      Department: 'Technical Support',
      Designation: 'Manager',
      RoleCode: 'TSM',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 2,
      SrNo: 2,
      UserName: 'USR002',
      PersonName: 'Person 2',
      UnitCode: 'Unite 1',
      Department: 'Production',
      Designation: 'Manager',
      RoleCode: 'PM',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 3,
      SrNo: 3,
      UserName: 'USR003',
      PersonName: 'Person 3',
      UnitCode: 'All',
      Department: 'Management',
      Designation: 'Manager',
      RoleCode: 'MM',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 4,
      SrNo: 4,
      UserName: 'USR004',
      PersonName: 'Person 4',
      UnitCode: 'Unite 1',
      Department: 'Production',
      Designation: 'Team Lead',
      RoleCode: 'PM',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 5,
      SrNo: 5,
      UserName: 'USR005',
      PersonName: 'Person 5',
      UnitCode: 'All',
      Department: 'Management',
      Designation: 'Engineer',
      RoleCode: 'ME',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 6,
      SrNo: 6,
      UserName: 'USR006',
      PersonName: 'Person 6',
      UnitCode: 'Unite 1',
      Department: 'Production',
      Designation: 'General Manager',
      RoleCode: 'PGM',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 7,
      SrNo: 7,
      UserName: 'USR007',
      PersonName: 'Person 7',
      UnitCode: 'All',
      Department: 'HRD',
      Designation: 'Manager',
      RoleCode: 'HRDE',
      Action: 'actions', // Placeholder for action icons
    },
  ];

  const columns2 = [
    {
      title: 'Role Code',
      dataIndex: 'RoleCode',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <Popconfirm
            title="Sure to delete?"
            className="btn-outline"
          >
            <Button> {dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const rolesData = [
    {
      key: 1,
      RoleCode: 'TSM',
      Description: 'Technical Support',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 2,
      RoleCode: 'PM',
      Description: 'Production Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 3,
      RoleCode: 'MM',
      Description: 'Mechanical Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 4,
      RoleCode: 'PM',
      Description: 'Production Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 5,
      RoleCode: 'ME',
      Description: 'Management Engineer',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 6,
      RoleCode: 'PGM',
      Description: 'Production General Manager',
      Action: 'actions', // Placeholder for action icons
    },
    {
      key: 7,
      RoleCode: 'HRDE',
      Description: 'HRD',
      Action: 'actions', // Placeholder for action icons
    },
  ];

  return (
    <>
      <CommonHeader breadCum="User and Role Management" />
      <div className="flex role-permission-main mt-4">
        <div className="management-table w-full">
          <div className="text-right">
            <Button type="primary" htmlType="submit" className="btn-main">
              {addIcon}Add New User
            </Button>
          </div>
          <TableComponent columns={columns1} data={usersData} />
        </div>

        <div className="table-devider" />

        <div className="management-table w-full">
          <div className="text-right">
            <Button type="primary" htmlType="submit" className="btn-main">
              {addIcon}Add New Role
            </Button>
          </div>
          <TableComponent columns={columns2} data={rolesData} />
        </div>
      </div>
    </>
  );
};

export default UserAndRoleManagement;
