'use client';

import { Layout } from 'antd';
import React, { useState } from 'react';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import LoginPage from '../(auth)/login/page';
import { usePathname } from 'next/navigation';

const { Content } = Layout;
const DataLayout = ({ children }: any) => {
  const [resCollapsed, setResCollapsed] = useState(false);
  const pathname = usePathname()
  return (
    <>
      {pathname === '/login' ?
        <LoginPage />
        :
        <Layout className="min-h-screen bg-gray-light dark:bg-dark-blue flex-row">
          <Sidebar resCollapsed={resCollapsed} />
          <Layout className="pl-5 py-5 bg-gray-light dark:bg-dark-blue">
            <Header resCollapsed={resCollapsed} setResCollapsed={setResCollapsed} />
            <Content className="mt-[20px] rounded-[1rem] bg-white py-5 px-5 max-h-full overflow-auto block-main dark:bg-dark-gray-200">
              <div className="block-main__top">{children}</div>
            </Content>
          </Layout>
        </Layout>
      }

    </>
  );
};

export default DataLayout;
