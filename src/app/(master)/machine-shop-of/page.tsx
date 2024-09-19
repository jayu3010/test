import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const MachineShopOf = dynamic(
  () => import('@/component/master/machineShopOf/MachineShopOf'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <MachineShopOf />;
};

export default page;
