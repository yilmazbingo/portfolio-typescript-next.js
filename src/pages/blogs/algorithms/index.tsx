import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { IBlog } from "@/types/interfaces";
import BlogItem from "@/components/blog-view/BlogItem";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: userData, loading } = useGetUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={userData}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead imagePath="/images/algo.webp">
          <h1>Data Structures </h1>
          <h2> AND </h2>
          <h1>Algorithms</h1>
        </Masthead>
        <BasePage
          title="Data Structures Algorithm Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="algorithms with python and javascript blogs Yilmaz Bingol"
        >
          {blogs.length > 0 &&
            blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("algorithms");
  return {
    props: { blogs: data },
    revalidate: 1,
  };
}

export default Javascript;
