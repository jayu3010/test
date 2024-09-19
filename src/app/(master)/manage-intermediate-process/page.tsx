import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const IntermediateProcess = dynamic(
  () => import('@/component/master/intermediateProcess/IntermediateProcess'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <IntermediateProcess />;
};

export default page;
