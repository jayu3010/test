import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageMake = dynamic(
  () => import('@/component/master/manage-machine-make/ManageMachineMake'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageMake />;
};

export default page;
