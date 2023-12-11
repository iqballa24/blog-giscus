'use client';

import React, { useCallback, useState } from 'react';

import Markdown from 'markdown-to-jsx';


interface MainContentProps {
  content: string;
  listTitle: { id: string; level: number; title: string; slug: string }[];
}

const MainContent = (props: MainContentProps) => {
  const { content, listTitle } = props;
  const [active, setActive] = useState(
    listTitle?.length > 0 ? listTitle[0].title : ''
  );

  const isElementInViewport = (el: HTMLElement | null) => {
    const rect = el?.getBoundingClientRect();
    if (rect)
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
  };

  const handleScroll = useCallback(() => {
    const headingElements = listTitle.map(({ slug }) =>
      document.getElementById(slug)
    );
    const visibleHeadings = headingElements.filter((el) =>
      isElementInViewport(el)
    );

    if (visibleHeadings.length > 0) {
      setActive(visibleHeadings[0]?.id || '');
    }
  }, [listTitle]);

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    // clean up the effect by removing the event listener
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, listTitle]);

  return (
    <div className="relative flex flex-row justify-between scroll-smooth">
      <article className="prose">
        <Markdown>{content}</Markdown>
      </article>

      <div className="sticky self-start top-0 right-0">
        <div className="flex flex-col gap-1">
          {listTitle?.map((item) => (
            <a
              key={item.id}
              className={`px-3 py-2 hover:bg-slate-50 rounded cursor-pointer ${
                item.level === 3 && 'ml-5'
              } ${active === item.slug && 'font-bold'}`}
              href={`#${item.slug}`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
