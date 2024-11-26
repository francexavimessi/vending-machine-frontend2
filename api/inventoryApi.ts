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
  return axiosAuth(config);
}

const basePageUrl = "";

export function getInventoryAll(axiosAuth: AxiosInstance, params?: any) {
	return axiosAuth.get(basePageUrl+"/inventory", { params });
}
export function getInventoryById(axiosAuth: AxiosInstance, id: string) {
	return axiosAuth.get(basePageUrl+`/inventory/${id}`);
}
export function purchase(axiosAuth: AxiosInstance, form: any) {
	return apiRequest(axiosAuth, "POST", basePageUrl+"/purchase", form);
}

export function updateInventory(
	axiosAuth: AxiosInstance,
	id: string,
	form: any
) {

    const { _id, __v, ...filteredForm } = form;

    return axiosAuth.put(`${basePageUrl}/inventory/${id}`, filteredForm);
}

export function deleteInventorById(axiosAuth: AxiosInstance, id: string,) {
	return axiosAuth.delete(basePageUrl+`/inventory/${id}`);
}


export function createInventory(axiosAuth: AxiosInstance, form: any) {
	return axiosAuth.post(basePageUrl+"/inventory", form);
}