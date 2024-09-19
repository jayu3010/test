import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageCell = dynamic(
  () => import('@/component/master/manage-cell/ManageCell'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageCell />;
};

export default page;
