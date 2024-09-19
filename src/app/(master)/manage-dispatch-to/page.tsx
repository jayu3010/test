import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageDispatchTo = dynamic(
  () => import('@/component/master/manage-dispatch-to/ManageDispatchTo'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageDispatchTo />;
};

export default page;
