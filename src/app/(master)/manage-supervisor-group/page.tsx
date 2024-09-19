import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageSupervisorGroup = dynamic(
  () =>
    import('@/component/master/manage-supervisor-group/ManageSupervisorGroup'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageSupervisorGroup />;
};

export default page;
