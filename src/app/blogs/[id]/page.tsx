// src/app/blogs/[id]/page.tsx
import type { Blog } from '../../../types/blog';
import IntroSection from './components/IntroSection';

export default async function DetailBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params.id is a plain string here
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/api/blogs/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return <p>Not found</p>;
  }
  const blog = (await res.json()) as Blog;

  return <IntroSection blog={blog} />;
}
