import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const OperatorWorkCenter = dynamic(
  () => import('@/component/master/operatorWorkCenter/OperatorWorkCenter'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <OperatorWorkCenter />;
};

export default page;
