import React, { useEffect } from "react";
import { useGetUser } from "@/actions/user";
import BlogItem from "@/components/blog-view/BlogItem";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import { IBlog } from "@/types/interfaces";
import { FaReact } from "react-icons/fa";
import { getPostsByField } from "@/helpers/markdownBlogs";

import BlogApi from "@/lib/api/blogs";

const ReactBlogs: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={userData}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead>
          <div className="react-icon-masthead">
            <FaReact />
          </div>

          <h1>World of React</h1>
          <span className="subheading">Reactism</span>
        </Masthead>
        <BasePage
          title="React.js Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="react.js blogs Yilmaz Bingol"
        >
          {blogs &&
            blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("react");
  const markDownPosts = getPostsByField("react");

  const allBlogs = [...markDownPosts, ...data];

  return {
    props: { blogs: data },
    // Error: The `unstable_revalidate` property is available for general use. Please use `revalidate` instead.
    revalidate: 1,
  };
}

export default ReactBlogs;
