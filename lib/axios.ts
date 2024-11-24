import axios from "axios";
import https from "https"; // Use `import` for the `https` module
import { Backend_URL } from "./constant";

export default axios.create({
  baseURL: Backend_URL,
  headers: { "Content-Type": "application/json" },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL verification
  }),
});

export const axiosAuth = axios.create({
  baseURL: Backend_URL,
  headers: { "Content-Type": "application/json" },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL verification
  }),
});
