import axios from "axios";

export default class GetService {
  static async getStoredData(url, catalog) {
    try {
      const res = await axios.get(`${url}/${catalog}.json`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
