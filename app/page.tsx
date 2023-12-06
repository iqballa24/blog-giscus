import Link from 'next/link';
import { getPostMetadata } from '@/components/getPostMetadata';
import PostPreview from '@/components/PostPreview';

export default function Home() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return <main className="grid lg:grid-cols-2 gap-4">{postPreviews}</main>;
}
