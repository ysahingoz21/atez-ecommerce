'use client';

import { Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <Title level={2}>Welcome to Atez Store</Title>
      <Paragraph>
        Explore high-quality products from trusted brands. Use the navigation menu above to browse categories and discover top deals.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={() => router.push('/products')}
        className="mt-4"
      >
        View Products
      </Button>
    </div>
  );
}
