import React from "react";

interface BlogHeaderProps {
  title: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title }) => {
  return (
    <header className="blog-header">
      <h1>{title}</h1>
    </header>
  );
};
export default BlogHeader;
