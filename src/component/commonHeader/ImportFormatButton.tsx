'use client';

import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import { importIcon } from '@/utils/icons/icons';
import { addOpenModal } from '@/utils/redux/features/reduxData';

const excludedPaths = [
  '/manage-daily-production-mail', '/manage-planning-log', '/batch-timing', '/machine-shop-of',
  '/manage-shift-management', '/work-center-type-master',
  '/manage-downtime-reason-work-center', '/manage-dispatch-to', '/manage-weekly-off', '/manage-hmi-badge', '/manage-pre-process', '/manage-pre-function',
  '/manage-material-code', '/manage-unplanned-production-reason', '/asst-manager-master', '/manage-supervisor-group', '/manage-cell', '/manage-driver', '/manage-special-working-day', '/manage-document-type',
  '/manage-main-category', '/manage-sub-category', '/manage-machine-make', '/pallet-master', '/break-with-shift-management','/hmi-production','/role-permission', '/user-permission', '/user-and-role-management', '/fields-management'
];

const ImportFormatButton = ({ pathname }: any) => {
  const dispatch = useDispatch();

  if (excludedPaths.includes(pathname)) {
    return null;
  }
  const handleImport = () => {
    dispatch(addOpenModal('import'));
  };

  return (
    <>
      <Button type="link" className="btn-blank">
        Import Format
      </Button>
      <Button icon={importIcon} className="btn-outline" onClick={handleImport}>
        Import
      </Button>
    </>
  );
};

export default ImportFormatButton;
