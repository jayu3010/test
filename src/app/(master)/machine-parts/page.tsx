import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const MachineParts = dynamic(
  () => import('@/component/master/machine-parts/MachineParts'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <MachineParts />;
};

export default page;
