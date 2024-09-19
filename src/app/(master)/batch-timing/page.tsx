import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const BatchTiming = dynamic(
  () => import('@/component/master/batchTiming/BatchTiming'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <BatchTiming />;
};

export default page;
