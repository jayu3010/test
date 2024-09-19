import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageDocumentType = dynamic(
  () => import('@/component/master/manageDocumentType/ManageDocumentType'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageDocumentType />;
};

export default page;
