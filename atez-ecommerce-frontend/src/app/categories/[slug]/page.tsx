"use client";

import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Breadcrumb } from 'antd';
import { useParams, useRouter } from "next/navigation";

const { Meta } = Card;

type Product = {
  productId: number;
  brandId: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
};

type Category = {
  categoryName: string;
  slug: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:3001/categories/slug/${slug}`);
        const data = await res.json();
        setProducts(data);

        const catRes = await fetch(`http://localhost:3001/categories/slug/${slug}/detail`);
        const cat: Category = await catRes.json();
        setCategory(cat);

      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  return (
    <div className='px-12 pb-10'>
      <div className='text-[#000000E0] text-[30px] font-semibold flex items-center justify-center my-2'>
        <p>{category?.categoryName}</p>
      </div>
      <Breadcrumb
        items={[
          {title: "Home", onClick: () => router.push("/")},
          {title: "Categories", onClick: () => router.push("/categories")},
          {title: category?.categoryName || 'Category'}
        ]}
        className="cursor-pointer !mb-4"
      />
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
