import fs from 'fs';

import matter from 'gray-matter';

import { PostMetadata } from '@/components/PostMetadata';

export const getPostMetadata = (): PostMetadata[] => {
  const folder = 'posts/';
  const files = fs.readdirSync(folder);

  const markdownPosts = files.filter((file) => file.endsWith('.md'));
  const slugs = markdownPosts.map((file) => file.replace('.md', ''));

  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`posts/${filename}`, 'utf8');
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: filename.replace('.md', ''),
    };
  });

  return posts;
};
