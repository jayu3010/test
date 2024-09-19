import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const Holiday = dynamic(() => import('@/component/master/holiday/Holiday'), {
  loading: () => <Loader />,
});

const page = () => {
  return <Holiday />;
};

export default page;
