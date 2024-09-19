import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SpecialWorkingDay = dynamic(
  () => import('@/component/master/specialWorkingDay/SpecialWorkingDay'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <SpecialWorkingDay />;
};

export default page;
