import BaseLayout from "@/components/layouts/BaseLayout";
import React from "react";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import FloadingBoxAnime from "@/components/FloadingBoxesAnim";
import Loading from "@/components/Loading";

const Cv = () => {
  const { data, loading } = useGetUser();
  return (
    // <BaseLayout user={data} loading={loading}>
    //   <BasePage title="My Experiences - YILMAZ BINGOL">
    //     <Row>
    //       <Col md={{ size: 8, offset: 2 }}>
    //         <iframe
    //           style={{ width: "100%", height: "800px" }}
    //           src="/jerga_cv.pdf"
    //         />
    //       </Col>
    //     </Row>
    //   </BasePage>
    // </BaseLayout>
    <React.Fragment>
      <Loading />
    </React.Fragment>
    // <FloadingBoxAnime />
  );
};

export default Cv;
