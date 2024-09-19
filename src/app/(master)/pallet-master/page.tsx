import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const PalletMaster = dynamic(
  () => import('@/component/master/palletMaster/PalletMaster'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <PalletMaster />;
};

export default page;
