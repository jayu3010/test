import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const WorkCenter = dynamic(
  () => import('@/component/master/workCenter/WorkCenter'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <WorkCenter />;
};

export default page;
