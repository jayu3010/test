import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SchedulingPlayGround = dynamic(
  () => import('@/component/scheduling-play-ground/SchedulingPlayGround'),
  {
    loading: () => <Loader />,
  }
);
const page: React.FC = () => {
  return <SchedulingPlayGround />;
};

export default page;
