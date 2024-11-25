//TODO: For PROD Config
export const Backend_URL =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3080/vending-api/"
    : "http://localhost:3080/vending-api/";

//TODO: For Dev Config
// export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
