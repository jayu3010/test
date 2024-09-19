import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SchedulerEvent = dynamic(
  () => import('@/component/scheduler/Scheduler'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <SchedulerEvent />;
};

export default page;
