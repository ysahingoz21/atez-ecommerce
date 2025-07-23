'use client';

import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useState} from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post('http://localhost:3001/auth/login', values);
      const token = res.data.token;

      localStorage.setItem('token', token);
      setErrorMessage(null);
      router.push('/products');
    } catch (error: any) {
      let msg = 'Login failed. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        msg =
          error.response.data?.message ||
          error.response.data?.error?.message ||
          'Login failed.';
      }
      setErrorMessage(msg);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#FFFFFF] px-8 py-12 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-[#001529] text-2xl font-semibold text-center mb-2">Login</h2>

        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            className="!mb-2 !px-6 py-2!"
            onClose={() => setErrorMessage(null)}
          />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input 
              className="
                !bg-[#0015290a]
                !text-[#1f2937]
                !border-[#d1d5db]
                focus:!ring-1
                focus:!ring-[#001529]
                !rounded-md
                !py-2
                !px-3
                transition-all duration-300
              "
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password 
              className="
                !bg-[#0015290a]
                !text-[#1f2937]
                !border-[#d1d5db]
                focus:!ring-1
                focus:!ring-[#001529]
                !rounded-md
                !py-2
                !px-3
                transition-all duration-300
              "
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              className="
                !bg-[#001529e8] 
                !border
                !border-transparent
                hover:!bg-[#001529]
                hover:!border-[#000000]
                !text-[#f2f2f2] 
                transition-all duration-300
                !rounded
              " 
              htmlType="submit" 
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mb-2">
          <span className="text-[#001529]">Don't you have an account?</span>
        </div>
        <Button 
          className="
            !bg-[#001529e8] 
            !border
            !border-transparent
            hover:!bg-[#001529]
            hover:!border-[#000000]
            !text-[#f2f2f2] 
            transition-all duration-300
            !rounded
          " 
          onClick={() => router.push('/register')}
          block
        >
          Register
        </Button>
      </div>
    </div>
  );
}
