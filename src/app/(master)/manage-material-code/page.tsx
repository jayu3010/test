import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const MaterialCode = dynamic(
  () => import('@/component/master/materialCode/MateriaCode'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <MaterialCode />;
};

export default page;
