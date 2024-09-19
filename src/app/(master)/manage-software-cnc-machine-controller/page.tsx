import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageController = dynamic(
  () => import('@/component/master/controller/ManageController'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageController />;
};

export default page;
