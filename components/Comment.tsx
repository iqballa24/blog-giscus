'use client'

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <Giscus
      id="comments"
      repo="iqballa24/blog-giscus"
      repoId="R_kgDOK2SZFQ"
      category="General"
      categoryId="DIC_kwDOK2SZFc4Cbh_l"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark_dimmed"
      lang="en"
      loading="lazy"
    />
  );
}
