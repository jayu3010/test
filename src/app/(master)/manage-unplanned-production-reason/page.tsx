import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const UnplannedProductionReason = dynamic(
  () =>
    import(
      '@/component/master/unplannedProductionReason/UnplannedProductionReason'
    ),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <UnplannedProductionReason />;
};

export default page;
