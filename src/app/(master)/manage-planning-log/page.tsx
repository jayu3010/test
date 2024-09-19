import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManagePlanningLog = dynamic(
  () => import('@/component/master/managePlanningLog/ManagePlanningLog'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManagePlanningLog />;
};

export default page;
