'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { SearchOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './sidebar.scss';
import { Input, MenuProps, Typography, Button, Layout, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import SidebarArray from '@/utils/sidebarArray';
import { searchMenu } from '@/utils/functions/commonFunction';

import PPCLogo from '../../../../public/images/Smart PPC.svg';
import Logo from '../../../../public/images/logo.svg';
import LogoIcon from '../../../../public/images/logo-icon.svg';

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ resCollapsed }:any) => {
  const router = useRouter();
  const themeColor = useSelector((state: any) => state.reduxData.theme);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [themeColorData, setThemeColorData] = useState('');

  const [breakpoint, setBreakpoint] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // Initialize the openKeys state with the key of the first tab
  const [openKeys, setOpenKeys] = useState(['sub1']);

  type MenuItem = Required<MenuProps>['items'][number];

  // const handleMenuItemClick = (link: any) => {
  //   router.push(link);
  // };
  const handleMenuItemClick = (link: any) => {
    setSelectedKeys([link]); // Set the clicked item as the selected key
    localStorage.setItem('selectedMenuItem', link); // Save the selected item to local storage
    router.push(link);
  };
  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const items: MenuItem[] = SidebarArray.map((item) => ({
    key: `sub${item.id}`,
    label: item.title,
    icon: item.icon,
    children: [
      {
        key: `g${item.id}`,
        type: 'group',
        children: item?.subMenu?.map((subItem: any) => ({
          key: subItem?.link,
          label: (
            <Link href={subItem?.link} prefetch={false}>
              {subItem?.name}
            </Link>
          ),
          link: subItem?.link,
          onClick: () => handleMenuItemClick(subItem?.link),
        })),
      },
    ],
  }));

  const [filteredMenu, setFilteredMenu] = useState(items);
  const handleSearch = useCallback(
    debounce((term: any) => {
      if (term) {
        const filtered = searchMenu(items, term);
        setFilteredMenu(filtered);
      } else {
        setFilteredMenu(items);
      }
    }, 300),
    []
  );

  useEffect(() => {
    handleSearch(searchTerm);
    return () => {
      handleSearch.cancel();
    };
  }, [searchTerm, handleSearch]);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    // Retrieve the selected menu item from local storage when the component mounts
    const savedSelectedItem = localStorage.getItem('selectedMenuItem');
    if (savedSelectedItem) {
      setSelectedKeys([savedSelectedItem]);
    }
  }, []);
  useEffect(()=>{
if(themeColor){
  setThemeColorData(themeColor)
}
  },[themeColor])
  return (
    <Sider
      trigger={null}
      breakpoint="xl"
      onBreakpoint={(broken) => {
        setBreakpoint(broken);
      }}
      collapsible
      collapsed={collapsed}
      className={`!bg-white dark:!bg-black ${
        collapsed ? '!w-[80px]' : ' xl:!w-[250px] 2xl:!w-[271px]'
      } bg-blue-50 !max-w-[unset] !min-w-[unset] !flex-[unset] block-sidebar ${breakpoint ? '!w-0' : ''} ${resCollapsed ? '!w-[250px]' : 'block-sidebar--open'} `}
    >
      <div className="demo-logo-vertical mb-[34px]">
        <Image
          src={collapsed ? LogoIcon : Logo}
          width={500}
          height={500}
          alt="AlpineMach"
          className="h-[30px] w-[auto]"
        />
      </div>

      <div className="block-sidebar__search mb-[17px]">
        <Input
          onChange={handleChange}
          placeholder="Filter Menu"
          prefix={<SearchOutlined />}
          className={`input-item ${themeColorData == 'dark' ? 'dark' : 'light'} ${collapsed ? 'input-item--collapsed' : ''} `}
        />
      </div>

      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        selectedKeys={selectedKeys}
        items={filteredMenu}
        theme={`${themeColorData == 'dark' ? 'dark' : 'light'}`}
        className="border-r-0 block-sidebar__menu dark:bg-black"
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      />

      <div className="block-sidebar__toggle">
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="!w-[23px] h-[56px] p-0 !text-sm rounded-r-[5px] rounded-none !bg-white dark:!bg-black dark:text-white hover:!text-blue hidden xl:block"
        />
      </div>

      <div
        className={`block-sidebar__bottom border-solid border-t-[1px] border-t-[#F2F2F2] dark:border-t-[#2E3A47] ${
          collapsed ? 'hidden' : 'flex'
        } pt-3  items-center flex-col`}
      >
        <Image src={PPCLogo} height={100} width={100} alt="Smart PPC" />
        <Title className="pt-2 !mb-0 text-color" level={5}>
          V 1.0
        </Title>
      </div>
    </Sider>
  );
};

export default Sidebar;
