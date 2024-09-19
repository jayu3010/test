import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageMachine = dynamic(
  () => import('@/component/master/manage-machine/ManageMachine'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageMachine />;
};

export default page;
