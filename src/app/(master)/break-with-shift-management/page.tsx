import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ShiftBreak = dynamic(
  () => import('@/component/master/breakShiftManagement/ShiftBreak'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ShiftBreak />;
};

export default page;
