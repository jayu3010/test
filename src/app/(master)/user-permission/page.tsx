import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';
import RolePermission from '@/component/master/userPermission/UserPermission';

const page = () => {
  return <RolePermission />;
};

export default page;
