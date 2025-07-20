'use client';

import { Layout, Menu, Input, Button, Space, Avatar } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TagsOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Header, Content } = Layout;
const { Search } = Input;

export default function HomePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleMenuClick = (key: string) => {
    router.push(`/${key}`);
  };

  return (
    <Layout className="min-h-screen">
      {/* Top Navbar */}
      <Header className="flex justify-between items-center bg-[#3f4640] px-6">
        {/* Logo */}
        <div className="text-white text-xl font-bold">Atez Store</div>

        {/* Search Bar */}
        <div className="w-1/3">
          <Search placeholder="Search products..." enterButton />
        </div>

        {/* Profile + Logout */}
        <Space>
          <Button
            icon={<UserOutlined />}
            type="default"
            className="text-white border-white"
            onClick={() => router.push('/profile')}
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

      {/* Bottom Navbar */}
      <Menu
        mode="horizontal"
        className="flex justify-center bg-[#D0DDD0]"
        onClick={(e) => handleMenuClick(e.key)}
        items={[
          { key: '', icon: <HomeOutlined />, label: 'Home' },
          { key: 'categories', icon: <AppstoreOutlined />, label: 'Categories' },
          { key: 'brands', icon: <TagsOutlined />, label: 'Brands' },
        ]}
      />

      {/* Page Content */}
      <Content className="p-8 bg-[#F2F2F2] min-h-[calc(100vh-112px)]">
        <div className="text-3xl font-semibold text-[#3f4640] mb-4">Welcome to Atez Store</div>
        <p className="text-gray-700">
          Browse products, categories, and brands from the navigation above.
        </p>
      </Content>
    </Layout>
  );
}
