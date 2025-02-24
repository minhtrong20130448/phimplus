import type { AxiosError } from "axios";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();

/**
 * handleError -> handle error globally
 * - handle error as DEFAULT:
        ↳ show error notification or open a popup
        ↳ define new message for each error code (maybe need to apply intl)
        ↳
 * - turn off handle DEFAULT
 * - custommize error
 */

export default function handleErrorGlobally(error: AxiosError) {
  if (error.isAxiosError) {
    // handle error globally here
    console.log(
      ">>>>>>>>>>>> Error message handle globally: ",
      error.response?.data,
    );

    return error.response?.data;
  } else {
    console.log("unexpected error: ", error);
    return ">>>>>>>>>>>> An unexpected error occurred";
  }
}

// const mainUrl = publicRuntimeConfig.mainAPI;
const URL_API = {
  product: "/product/v1",
};

const errorHandleConfig = {
  [`${URL_API.product}/list-products/([^/]*)`]: {
    404: "Product not found",
    500: "Internal server error",
  },
};

/**
 * AxiosError<DataType, ErrorType>
 * params:
    code: "ERR_BAD_REQUEST"
    message: "Request failed with status code 404"
    name: "AxiosError"
    config:
    request:
    response: <AxiosResponse> {
      status: 404
      statusText: "Not Found"
      data: "__response payload from API__"
      ...
    }

 * methods:
    - isAxiosError
    - toJSON
 */
