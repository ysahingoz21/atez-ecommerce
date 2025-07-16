"use client";

import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin } from 'antd';

const { Meta } = Card;

interface Product {
  productId: number;
  brandId: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3001/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        });
    };
  
    fetchData(); // initial load
  
    // load data every 5 seconds
    const interval = setInterval(fetchData, 5000);
  
    return () => clearInterval(interval);
  }, []);  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.productId}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.productName}
                    src={product.imageUrl || 'https://via.placeholder.com/240'}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <Meta
                  title={product.productName}
                  description={
                    <>
                      <div>{product.description}</div>
                      <div><b>Price:</b> {product.price} ₺</div>
                      <div><b>Stock:</b> {product.stockQuantity}</div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
