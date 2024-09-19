import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';
import UserAndRoleManagement from '@/component/master/userAndRoleManagement/UserAndRoleManagement';

const page = () => {
  return <UserAndRoleManagement />;
};

export default page;
