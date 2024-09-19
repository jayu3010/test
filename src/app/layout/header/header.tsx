import React from 'react';
import { Dropdown, Typography, Badge, Button } from 'antd';
import type { MenuProps } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

import { MenuIconLeft, MenuIconRight, watchIcon } from '@/utils/icons/icons';
const { Title } = Typography;

const Header = ({ setResCollapsed, resCollapsed }: any) => {
  const pathname = usePathname();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Profile
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '2',
      danger: true,
      label: 'Logout',
      icon: <SmileOutlined />,
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-gray-200 px-5 py-4 rounded-[1rem] block-header flex justify-between gap-5 items-center relative">
      {pathname === '/machine-shop-planning' && (
        <div className="schedule-message absolute flex items-center px-2 text-white rounded">
          {watchIcon}Scheduling is in progress. All data will be refreshed
          shortly.
        </div>
      )}
      <div className="block-header__col flex gap-3">
        <Button
          type="text"
          icon={resCollapsed ? <MenuIconRight /> : <MenuIconLeft />}
          onClick={() => setResCollapsed(!resCollapsed)}
          className="!w-[30px] h-[56px] p-0 !text-sm rounded-r-[5px] rounded-none h-auto !bg-white dark:!bg-dark-gray-200 dark:text-gray-dark xl:hidden"
        />
        <Title
          level={5}
          className="!text-sm !text-gray-dark  font-medium !mb-0"
        >
          Last Login: <span className="block">10/07/2024 10:00AM</span>
        </Title>
      </div>
      <div className="block-header__col">
        {/* <DarkMode /> */}
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="flex gap-3 items-center">
              <div className="">
                <Title
                  level={5}
                  className="!text-xs text-black dark:text-white font-medium !mb-0"
                >
                  Shop Supervisor{' '}
                  <span className="block font-bold">Akash Prajapatri</span>
                </Title>
              </div>
              <div className="">
                <Badge
                  className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center !text-xs  font-bold text-blue"
                  style={{ backgroundColor: '#52c41a' }}
                >
                  AV
                </Badge>
              </div>
            </div>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
