// src/app/blogs/[id]/page.tsx
import type { Blog } from '@/types/blog';

import IntroSection from './components/IntroSection';

export default async function DetailBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params.id is a plain string here
  const { id } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return <p>Not found</p>;
  }
  const blog = (await res.json()) as Blog;

  return <IntroSection blog={blog} />;
}
