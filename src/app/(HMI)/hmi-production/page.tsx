import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const HMIProduction = dynamic(
  () => import('@/component/HMI/hmi-production/HMI'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <HMIProduction />;
};

export default page;
