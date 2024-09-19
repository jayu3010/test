import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageDriver = dynamic(
  () => import('@/component/master/driver/ManageDriver'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageDriver />;
};

export default page;
