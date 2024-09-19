import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SpecialShiftWorkingDay = dynamic(
  () =>
    import('@/component/master/specialShiftWorkingDay/SpecialShiftWorkingDay'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <SpecialShiftWorkingDay />;
};

export default page;
