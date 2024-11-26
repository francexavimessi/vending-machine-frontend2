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
interface ImageUploadResponse {
  message: string;
  filename: string;
  path: string;
}

const basePageUrl = "";

export function getProductAll(axiosAuth: AxiosInstance, params?: any) {
	return axiosAuth.get(basePageUrl+"/products", { params });
}
export function uploadImage(axiosAuth: AxiosInstance, formData: FormData) {
  return axiosAuth.post<ImageUploadResponse>("/images/upload", formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
}
export function getProductById(axiosAuth: AxiosInstance, id: string) {
	return axiosAuth.get(basePageUrl+`/products/${id}`);
}
export function updateProduct(
	axiosAuth: AxiosInstance,
	id: string,
	form: any
) {

    const { _id, __v, ...filteredForm } = form;

    return axiosAuth.put(`${basePageUrl}/products/${id}`, filteredForm);
}

export function deleteProductById(axiosAuth: AxiosInstance, id: string,) {
	return axiosAuth.delete(basePageUrl+`/products/${id}`);
}


export function createProduct(axiosAuth: AxiosInstance, form: any) {
	return axiosAuth.post(basePageUrl+"/products", form);
}
