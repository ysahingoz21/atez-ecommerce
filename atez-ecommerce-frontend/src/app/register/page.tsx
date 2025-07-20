'use client';

import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useState} from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    try {
      await axios.post('http://localhost:3001/auth/register', values);
      setErrorMessage(null);
      router.push('/login');
    } catch (error: any) {
      let msg = 'Registration failed. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        msg = 
          error.response.data?.error?.message || 
          'Registration failed.';
      } 
      setErrorMessage(msg);      
    }
  };

  return (
    <div className="min-h-screen bg-[#727D73] flex items-center justify-center">
      <div className="bg-[#F2F2F2] py-6 px-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-[#3f4640] text-2xl font-semibold text-center mb-4">Register</h2>

        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            className="!mb-4 !px-6 py-4!"
            onClose={() => setErrorMessage(null)}
          />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <div className='flex items-center justify-between'>
            <Form.Item className="!w-[48%]" label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input 
                className="
                  !bg-[#D0DDD0]
                  !text-[#1f2937]
                  !border-[#d1d5db]
                  focus:!ring-1
                  focus:!ring-[#3f4640]
                  !rounded-md
                  !py-2
                  !px-3
                  transition-all duration-300
                "
                placeholder="Enter your first name"
              />
            </Form.Item>
            <Form.Item className="!w-[48%]" label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input 
                className="
                  !bg-[#D0DDD0]
                  !text-[#1f2937]
                  !border-[#d1d5db]
                  focus:!ring-1
                  focus:!ring-[#3f4640]
                  !rounded-md
                  !py-2
                  !px-3
                  transition-all duration-300
                "
                placeholder="Enter your last name"
              />
            </Form.Item>
          </div>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input 
              className="
                !bg-[#D0DDD0]
                !text-[#1f2937]
                !border-[#d1d5db]
                focus:!ring-1
                focus:!ring-[#3f4640]
                !rounded-md
                !py-2
                !px-3
                transition-all duration-300
              "
              placeholder="Enter your phone number"
            />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input 
              className="
                !bg-[#D0DDD0]
                !text-[#1f2937]
                !border-[#d1d5db]
                focus:!ring-1
                focus:!ring-[#3f4640]
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
            rules={[
              { required: true },
              { min: 6, message: 'Password must be at least 6 characters long' },
              {
                validator: (_, value) =>
                  value && /\d/.test(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Password must contain at least one number')),
              },
            ]}
          >
            <Input.Password 
              className="
                !bg-[#D0DDD0]
                !text-[#1f2937]
                !border-[#d1d5db]
                focus:!ring-1
                focus:!ring-[#3f4640]
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
                !bg-[#727D73] 
                !border
                !border-transparent
                hover:!bg-[#3f4640]/90
                hover:!border-[#000000]
                !text-[#f2f2f2] 
                transition-all duration-300
                !rounded
              " 
              htmlType="submit" 
              block
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mb-2">
          <span className="text-[#3f4640]">Do you have an account?</span>
          <Button
            type="link"
            className="!text-[#3f4640] !font-semibold hover:!text-[#3f4640]/90 p-0 !text-lg"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
