import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageDowntimeCategory = dynamic(
  () =>
    import(
      '@/component/master/manage-downtime-category/ManageDowntimeCategory'
    ),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageDowntimeCategory />;
};

export default page;
