import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const FuturePlanningWithOutData = dynamic(
  () =>
    import(
      '@/component/machineShop/futurePlanningWithOutData/FuturePlanningWithOutData'
    ),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <FuturePlanningWithOutData />;
};

export default page;
