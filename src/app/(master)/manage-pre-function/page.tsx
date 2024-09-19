import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const PreFunction = dynamic(
  () => import('@/component/master/preFunction/PreFunction'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <PreFunction />;
};

export default page;
