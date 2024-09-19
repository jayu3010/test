import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const DowntimeReasonGeneric = dynamic(
  () =>
    import('@/component/master/downtimeReasonGeneric/DowntimeReasonGeneric'),
  {
    loading: () => <Loader />,
  }
);
const page = () => {
  return <DowntimeReasonGeneric />;
};

export default page;
