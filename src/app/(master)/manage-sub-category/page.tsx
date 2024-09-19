import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const SubCategory = dynamic(
  () => import('@/component/master/subCategory/SubCategory'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <SubCategory />;
};

export default page;
