import axios from "axios";
import BaseApi from "./BaseApi";

class PortfolioApi extends BaseApi {
  constructor(accessToken: string = "", subPath: string = "") {
    super(accessToken, "/portfolios");
    // this.subPath = "/portfolios";
  }

  delete(id: string) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config);
  }
}

export default PortfolioApi;
