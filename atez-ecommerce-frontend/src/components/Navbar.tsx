'use client';

import { Layout, Menu, Input, Button, Space } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TagsOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Header } = Layout;
const { Search } = Input;

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  const handleMenuClick = (e: any) => {
    router.push(`/${e.key}`);
  };

  const handleProfileClick = (e: any) => {
    if (token) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Header className="flex justify-between items-center bg-[#3f4640] px-6">
        <div className="text-white text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          Atez Store
        </div>

        <div className="w-1/3 flex items-center">
          <Search placeholder="Search products..." enterButton />
        </div>
        <Space>
          <Button
            icon={<UserOutlined />}
            type="default"
            className="text-white border-white"
            onClick={(handleProfileClick)}
          >
            Profile
          </Button>
          {token && (
            <Button
              icon={<LogoutOutlined />}
              danger
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Space>
      </Header>

      <Menu
        mode="horizontal"
        className="flex justify-center bg-[#D0DDD0]"
        onClick={handleMenuClick}
        items={[
          { key: '', icon: <HomeOutlined />, label: 'Home' },
          { key: 'categories', icon: <AppstoreOutlined />, label: 'Categories' },
          { key: 'brands', icon: <TagsOutlined />, label: 'Brands' },
        ]}
      />
    </div>
  );
}