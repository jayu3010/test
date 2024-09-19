import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageHmiBadge = dynamic(
  () => import('@/component/master/manage-hmi-badge/ManageHmiBadge'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageHmiBadge />;
};

export default page;
