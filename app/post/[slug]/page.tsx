import fs from 'fs';

import { extractHeadings } from 'extract-md-headings';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import { notFound } from 'next/navigation';

import Comments from '@/components/Comment';
import { getPostMetadata } from '@/components/getPostMetadata';
import MainContent from '@/components/MainContent';

const getPostContent = (slug: string) => {
  try {
    const folder = 'posts/';
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);

    const headingsContent = extractHeadings(file);

    return { ...matterResult, headingsContent };
  } catch (err) {
    return null;
  }
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  const listTitle = post?.headingsContent || [];

  if (!post) return notFound();

  return (
    <>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600 ">{post.data.title}</h1>
        <p className="text-slate-400 mt-2">{post.data.date}</p>
      </div>

      <MainContent content={post.content} listTitle={listTitle} />

      <Comments />
    </>
  );
};

export default PostPage;
