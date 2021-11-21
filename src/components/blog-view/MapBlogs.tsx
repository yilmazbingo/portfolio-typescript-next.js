import React from "react";
import { IBlog } from "@/types/interfaces";

import BlogItem from "@/components/blog-view/BlogItem";

interface MapBlogsProps {
  blogs: IBlog[];
}

const MapBlogs: React.FC<MapBlogsProps> = ({ blogs }) => {
  return (
    <div style={{ marginLeft: "2rem", marginRight: "1rem" }}>
      {blogs &&
        blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
    </div>
  );
};
export default MapBlogs;
