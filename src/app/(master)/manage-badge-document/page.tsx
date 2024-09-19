import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const BadgeDocument = dynamic(
  () => import('@/component/master/badgeDocument/BadgeDocument'),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <BadgeDocument />;
};

export default page;
