import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageMachineShop = dynamic(
  () => import('@/component/master/manageMachineShop/manageMachineShop'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageMachineShop />;
};

export default page;
