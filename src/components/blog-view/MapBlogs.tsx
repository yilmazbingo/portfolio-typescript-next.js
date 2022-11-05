import React from "react";
import { IBlog } from "@/types/interfaces";

import BlogItem from "@/components/blog-view/BlogItem";
import Divider from "../home-components/divider";

interface MapBlogsProps {
  blogs: IBlog[];
}

const MapBlogs: React.FC<MapBlogsProps> = ({ blogs }) => {
  return (
    <>
      <Divider />

      <div style={{ marginLeft: "2rem", marginRight: "1rem" }}>
        {blogs &&
          blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
      </div>
    </>
  );
};
export default MapBlogs;
