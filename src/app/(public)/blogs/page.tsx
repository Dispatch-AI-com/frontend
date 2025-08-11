'use client';

import { Box, Container } from '@mui/material';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';

import type { Blog } from '@/types/blog';

import Banner from './components/Banner';
import BlogFilterBar from './components/BlogFilterBar';
import BlogHighlightCard from './components/BlogHighlightCard';
import BlogList from './components/BlogList';
import SubscriptionSection from './components/SubscriptionSection';

export default function BlogsPage() {
  const [highlightBlogs, setHighlightBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // 使用 AbortController 来取消未完成的请求
    const abortController = new AbortController();

    const fetchHighlightBlogs = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';

        // 修复 1: 使用正确的参数传递方式
        const res = await axios.get<Blog[]>(`${baseUrl}/blogs/highlights`, {
          params: { limit: 3 }, // 正确传递参数
          signal: abortController.signal,
        });

        // 修复 2: 添加类型断言确保类型安全
        setHighlightBlogs(res.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch highlight blogs:', error);
        }
      }
    };

    void fetchHighlightBlogs();

    // 清理函数，取消未完成的请求
    return () => abortController.abort();
  }, []);
  return (
    <>
      <Box>
        <Banner />
        <Container
          sx={{
            width: '80%',
          }}
        >
          <BlogHighlightCard blogs={highlightBlogs} />
          <BlogFilterBar />
          <Suspense fallback={<p>Loading blogs...</p>}>
            <BlogList />
          </Suspense>
        </Container>
        <SubscriptionSection />
      </Box>
    </>
  );
}
