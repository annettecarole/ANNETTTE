import { axiosInstance } from "@refinedev/simple-rest";

type Error = {
  message: string;
  statusCode: number;
};

type CustomRequestInit = {
  method?: string;
  headers?: Record<string, any>;
  body?: any;
  params?: Record<string, any>;
};

const customFetch = async (url: string, options: CustomRequestInit) => {
  try {
    const response = await axiosInstance({
      url,
      method: options.method,
      headers: options.headers,
      data: options.body,
      params: options.params,
    });
    return response;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.message || error.message || "Unknown error",
      statusCode: error.response?.status || 500,
    };
  }
};

const getRestErrors = (body: any, status: number): Error | null => {
  if (!body || status >= 400) {
    return {
      message: body?.message || "Unknown error",
      statusCode: status,
    };
  }
  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const body = response.data;
  const error = getRestErrors(body, response.status);

  if (error) {
    throw error;
  }

  return {
    ...response,
    json: async () => body,
    status: response.status,
    headers: response.headers,
  };
};
