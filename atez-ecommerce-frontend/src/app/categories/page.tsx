"use client";

import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';

const { Meta } = Card;

interface Category {
  categoryId: number;
  categoryName: string;
  imageUrl?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3001/categories')
        .then(res => res.json())
        .then(data => {
          setCategories(data);
          setLoading(false);
        });
    };
  
    fetchData(); // initial load
  
    // load data every 5 seconds
    const interval = setInterval(fetchData, 5000);
  
    return () => clearInterval(interval);
  }, []);  

  return (
    <div className='px-12 pb-10'>
      <div className='text-[#000000E0] text-[30px] font-semibold flex items-center justify-center my-2'>
        <p>Categories</p>
      </div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {categories.map(category => (
            <Col xs={24} sm={12} md={8} lg={6} key={category.categoryId}>
              <Card
                hoverable
                cover={
                  <img
                    alt={category.categoryName}
                    src={category.imageUrl || 'https://via.placeholder.com/240'}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <Meta
                  title={category.categoryName}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
