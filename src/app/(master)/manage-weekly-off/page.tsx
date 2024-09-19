import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageWeeklyOff = dynamic(
  () => import('@/component/master/manage-weekly-off/ManageWeeklyOff'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageWeeklyOff />;
};

export default page;
