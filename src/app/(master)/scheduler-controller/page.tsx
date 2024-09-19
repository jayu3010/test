import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SchedulerController = dynamic(
  () => import('@/component/master/schedulerController/SchedulerController'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <SchedulerController />;
};

export default page;
