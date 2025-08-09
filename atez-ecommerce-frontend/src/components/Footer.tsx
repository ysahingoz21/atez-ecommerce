'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from '@ant-design/icons';

type Category = { categoryId: number; categoryName: string };
type Brand = { brandId: number; brandName: string };

export default function Footer() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, brandRes] = await Promise.all([
          fetch('http://localhost:3001/categories'),
          fetch('http://localhost:3001/brands'),
        ]);

        const categoriesData = await categoryRes.json();
        const brandsData = await brandRes.json();

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-[#222222] text-[#999999] mt-6">
      <div className="flex flex-row justify-between px-14 py-10 border-b border-gray-600">
        <div>
          <h3 className="font-bold !text-white text-[18px] mb-4">Atez Store</h3>
          <ul className="text-[14px]">
            <li className="mb-2">
              <Link href="/" className="hover:underline">Home</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold !text-white text-[18px] mb-4">Categories</h3>
          <ul className="text-[14px]">
            {categories.map((cat) => (
              <li key={cat.categoryId} className="mb-2">
                <Link href={`/categories/${cat.categoryName.toLowerCase()}`} className="hover:underline">
                  {cat.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold !text-white text-[18px] mb-4">Brands</h3>
          <ul className="text-[14px]">
            {brands.map((brand) => (
              <li key={brand.brandId} className="mb-2">
                <Link href={`/products/${brand.brandName.toLowerCase()}`} className="hover:underline">
                  {brand.brandName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-4 text-[12px] bg-[#222222]">
        <p>Copyright {new Date().getFullYear()} &copy; Atez Store. All rights reserved.</p>
        <div className="flex gap-4 text-xl mt-2 md:mt-0">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramFilled />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterSquareFilled />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookFilled />
          </a>
        </div>
      </div>
    </footer>
  );
}
