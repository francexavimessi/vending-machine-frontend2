import { AxiosInstance } from "axios";

type RequestMethod = "GET" | "POST" | "DELETE" | "PATCH";

export function apiRequest(
  axiosAuth: AxiosInstance,
  method: RequestMethod,
  endpoint: string,
  data?: any
) {
  const config = {
    url: endpoint,
    method,
    ...(method === "GET" ? { params: data } : { data }),
  };
  // console.log(config);
  return axiosAuth(config);
}

// interface IGetBankParams {
// 	bankName?: string;
// 	bankCode?: string;
// 	bankShortNameF1?: string;
// 	isServiceBank?: string;

// 	statusId?: number;
// 	page?: number;
// 	pageSize?: number;
// 	sort?: string;
// }
const basePageUrl = "vending-machine";

export function getProductAll(axiosAuth: AxiosInstance, params?: any) {
	return axiosAuth.get(basePageUrl+"/products", { params });
}
export function purchase(axiosAuth: AxiosInstance, form: any) {
	return apiRequest(axiosAuth, "POST", basePageUrl+"/purchase", form);
}
// export function getBankById(axiosAuth: AxiosInstance, bankId: number) {
// 	return axiosAuth.get(`master-management/bank/${bankId}`);
// }
// export function getBankBranch(axiosAuth: AxiosInstance, bankId: number) {
// 	return axiosAuth.get(`master-management/bank/branch/${bankId}`);
// }