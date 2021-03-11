import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { IBlog } from "@/types/interfaces";
import BlogItem from "@/components/blog-view/BlogItem";

const Javascript: React.FC<{ blogs: IBlog[] }> = ({ blogs }) => {
  const { data: dataUser, loading } = useGetUser();
  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={dataUser}
      loading={loading}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Masthead imagePath="/images/blockchain.png">
          {/* <h1>World of Blockchain</h1>
          <span className="subheading">Blockchainizm</span> */}
        </Masthead>
        <BasePage
          title="Blockchain and Bitcoin Blogs - YILMAZ BINGOL"
          className="blog-body"
          noWrapper
          metaDescription="blockchain bitcoin blogs Yilmaz Bingol"
        >
          {blogs &&
            blogs.map((blog: IBlog) => <BlogItem blog={blog} key={blog._id} />)}
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("blockchain");
  return {
    props: { blogs: data },
    revalidate: 1,
  };
}
export default Javascript;
