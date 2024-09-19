import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const MainCategory = dynamic(
  () => import('@/component/master/mainCategory/MainCategory'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <MainCategory />;
};

export default page;
