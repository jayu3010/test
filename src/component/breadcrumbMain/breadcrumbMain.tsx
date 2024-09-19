import React from 'react';
import { Breadcrumb } from 'antd';
import './breadcrumb.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import { convertPathToTitle } from '@/utils/functions/commonFunction';

interface MachineShopTableProps {
  breadCum?: string;
}
const BreadcrumbMain: React.FC<MachineShopTableProps> = ({ breadCum }: any) => {
  const themeColor = useSelector((state: any) => state.reduxData.theme);
  const pathname = usePathname();

  return (
    <Breadcrumb
      className={`block-main__breadcrumb ${themeColor == 'dark' ? 'dark' : 'light'}`}
      items={[
        {
          title: <Link href={{ pathname: '/' }}>Dashboard</Link>,
          className: 'text-base dark:text-gray-dark',
        },
        {
          title: breadCum || convertPathToTitle(pathname),
          className: 'text-base font-semibold dark:text-white',
        },
      ]}
    />
  );
};

export default BreadcrumbMain;
