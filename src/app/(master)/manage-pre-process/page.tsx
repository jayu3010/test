import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const PreProcess = dynamic(
  () => import('@/component/master/preProcess/PreProcess'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <PreProcess />;
};

export default page;
