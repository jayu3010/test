import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const AsstManager = dynamic(
  () => import('@/component/master/asstManager/AsstManager'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <AsstManager />;
};

export default page;
