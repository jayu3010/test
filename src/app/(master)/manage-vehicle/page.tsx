import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageVehical = dynamic(
  () => import('@/component/master/vehicle/ManageVehical'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageVehical />;
};

export default page;
