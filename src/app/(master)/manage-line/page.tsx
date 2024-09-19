import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';

const ManageLine = dynamic(() => import('@/component/master/line/ManageLine'), {
  loading: () => <Loader />,
});

const page = () => {
  return <ManageLine />;
};

export default page;
