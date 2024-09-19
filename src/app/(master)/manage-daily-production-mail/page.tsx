import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageDailyProductionMail = dynamic(
  () =>
    import(
      '@/component/master/manage-daily-production-mail/ManageDailyProductionMail'
    ),
  {
    loading: () => <Loader />,
  }
);

const page = () => {
  return <ManageDailyProductionMail />;
};

export default page;
