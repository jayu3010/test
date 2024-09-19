import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ShiftManagement = dynamic(
  () => import('@/component/master/shiftManagement/ShiftManagement'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ShiftManagement />;
};

export default page;
