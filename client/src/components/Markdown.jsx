import React from "react";
import Highlight from "react-highlight";
import ReactMarkdown from "react-markdown";

export default function Markdown({source}) {
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        blockquote: BlockQuote,
        code: Code,
        inlineCode: InlineCode,
        heading: Heading,
        image: Image,
        link: Link,
        list: List,
      }}
    />
  );
}

export function Heading({children, level}) {
  let size;
  switch (level) {
    case 1:
      size = "text-4xl md:text-5xl border-b border-gray-600";
      break;
    case 2:
      size = "text-3xl md:text-4xl";
      break;
    case 3:
      size = "text-2xl md:text-3xl";
      break;
    case 4:
      size = "text-xl md:text-2xl";
      break;
    case 5:
      size = "text-lg md:text-xl";
      break;
    case 6:
      size = "text-md md:text-lg";
      break;

    default:
      break;
  }
  return (
    <h1 className={`mt-4 mb-2 font-medium leading-tight ${size}`}>{children}</h1>
  );
}

export function List({children, ordered}) {
  return ordered ? (
    <ol className='ml-2 my-2 list-inside list-decimal'>{children}</ol>
  ) : (
    <ul className='ml-2 my-2 list-inside list-disc'>{children}</ul>
  );
}

export function Link({children, href}) {
  return (
    <a className='underline text-blue-500 hover:text-blue-700' href={href}>
      {children}
    </a>
  );
}

export function Code({language, value}) {
  return (
    <Highlight className={`my-4 shadow rounded ${language}`}>{value}</Highlight>
  );
}

export function InlineCode({value}) {
  return (
    <code className='px-2 text-gray-700 shadow border rounded bg-white'>
      {value}
    </code>
  );
}

export function Image({alt, src}) {
  return <img className='my-4 rounded' src={src} alt={alt} />;
}

export function BlockQuote({children}) {
  return (
    <blockquote className='border-l-4 border-gray-600 pl-6'>
      {children}
    </blockquote>
  );
}
