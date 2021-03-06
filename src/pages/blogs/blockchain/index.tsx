import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import BaseLayout from "@/components/layout/BaseLayout";
import Masthead from "@/components/shared/Masthead";
import BlogApi from "@/lib/api/blogs";
import { IBlog } from "@/types/interfaces";
import BlogItem from "@/components/blog-view/BlogItem";
import { postsDirectory } from "@/helpers/markdownBlogs";
import { getPostsByField } from "@/helpers/markdownBlogs";
import MapBlogs from "@/components/blog-view/MapBlogs";

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
          <MapBlogs blogs={blogs} />
        </BasePage>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data }: { data: IBlog[] } = await new BlogApi().getById("blockchain");
  const markDownPosts = getPostsByField("blockchain");

  const allBlogs = [...markDownPosts, ...data];

  return {
    props: { blogs: allBlogs },
    revalidate: 1,
  };
}
export default Javascript;
