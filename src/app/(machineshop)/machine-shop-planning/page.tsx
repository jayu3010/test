import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ShopPlanning = dynamic(
  () => import('@/component/master/shopPlanning/ShopPlanning'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ShopPlanning />;
};

export default page;
