import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const WorkCenterType = dynamic(
  () => import('@/component/master/workCenterType/WorkCenterType'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <WorkCenterType />;
};

export default page;
