import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/component/loader/Loader';
import FieldsManagement from '@/component/master/fieldsManagement/FieldsManagement';

const page = () => {
  return <FieldsManagement />;
};

export default page;
