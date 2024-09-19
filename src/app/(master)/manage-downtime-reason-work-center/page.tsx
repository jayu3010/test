import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ReasonWorkCenter = dynamic(
  () => import('@/component/master/reasonWorkCenter/ReasonWorkCenter'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ReasonWorkCenter />;
};

export default page;
