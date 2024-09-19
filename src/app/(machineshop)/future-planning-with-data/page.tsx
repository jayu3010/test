import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const FuturePlanningWithData = dynamic(
  () =>
    import(
      '@/component/machineShop/futurePlanningWithData/FuturePlanningWithData'
    ),
  {
    loading: () => <Loader />,
  }
);
const page: React.FC = () => {
  return <FuturePlanningWithData />;
};

export default page;
