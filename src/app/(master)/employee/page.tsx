import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const Employees = dynamic(
  () => import('@/component/master/employee/Employees'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <Employees />;
};

export default page;
