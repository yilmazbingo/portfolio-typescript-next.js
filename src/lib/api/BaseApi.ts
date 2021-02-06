import axios from "axios";
import { IBlog, IPortfolio } from "@/types/interfaces";

interface Config {
  headers?: { [key: string]: string };
}

class BaseApi {
  config: Config;
  apiUrl: string;
  constructor(public accessToken: string | null, public subPath: string) {
    this.config = {};

    if (accessToken) {
      this.config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    }

    this.apiUrl = process.env.PORTFOLIO_API_URL + subPath;
  }

  getAll() {
    return axios.get(this.apiUrl);
  }

  update(id: string, data: IBlog | IPortfolio) {
    return axios.patch(`${this.apiUrl}/${id}`, data, this.config);
  }

  getByUser() {
    return axios.get(`${this.apiUrl}/me`, this.config);
  }

  getById(id: string) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  getBySlug(slug: string) {
    return axios.get(`${this.apiUrl}/s/${slug}`);
  }

  create(data: IBlog | IPortfolio) {
    return axios.post(this.apiUrl, data, this.config);
  }
}

export default BaseApi;
