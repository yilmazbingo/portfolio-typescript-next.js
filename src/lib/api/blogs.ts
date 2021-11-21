import BaseApi from "./BaseApi";

// check the reusable react form
class BlogApi extends BaseApi {
  constructor(accessToken: string = "", subPath: string = "") {
    super(accessToken, "/blogs");
    // this.subPath = "/blogs";
  }
}

export default BlogApi;
