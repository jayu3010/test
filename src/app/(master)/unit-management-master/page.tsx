import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const UnitMaster = dynamic(
  () => import('@/component/master/unitMaster/UnitMaster'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <UnitMaster />;
};

export default page;
