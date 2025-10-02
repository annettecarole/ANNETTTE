import { AuthCredentials, Donor, GetListParams } from "@/types";
import { API_BASE_URL, dataProvider } from "./data";
import { HttpError } from "@refinedev/core";
import { register } from "module";

export const authCredentials = {
  email: "admin@gmail.com",
  password: "Admin1*",
};

export const authProvider = {
  login: async ({ email, password, phoneNumber, OTPCode }: AuthCredentials) => {
    const url =
      email && password
        ? `${API_BASE_URL}/auth/token/`
        : `${API_BASE_URL}/auth/token-otp/`;

    const payload =
      email && password
        ? { email, password }
        : { phone_number: phoneNumber, otp: OTPCode };

    try {
      const { data } = await dataProvider.custom({
        url,
        method: "post",
        headers: {},
        payload,
      });

      localStorage.setItem("access_token", data.access);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },

  register: async (donor: Donor) => {
    const payload = {
      name: donor.name,
      surname: donor.surname,
      sex: donor.sex,
      age: donor.age,
      phone_number: donor.phoneNumber,
      email: donor.email,
      password: donor.password,
    };

    try {
      await dataProvider.custom({
        url: `${API_BASE_URL}/donor/`,
        method: "post",
        headers: {},
        payload,
      });

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Register failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },

  getList: async ({ resource, pagination }: GetListParams) => {
    try {
      const page = pagination?.current ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const response = await dataProvider.custom({
        url: `${API_BASE_URL}/${resource}/?page=${page}&page_size=${pageSize}`,
        method: "get",
        headers: {},
      });

      const { results, count } = response.data;

      console.log(results, count);

      if (!Array.isArray(results)) {
        throw new Error(
          "Response format is incorrect: results should be an array"
        );
      }

      return {
        data: results,
        total: count,
      };
    } catch (e) {
      const error = e as Error;

      throw {
        message: "message" in error ? error.message : "Fetch failed",
        name: "name" in error ? error.name : "getListError",
        statusCode: e?.response?.status || 500,
      } as HttpError;
    }
  },

  logout: async () => {
    localStorage.removeItem("access_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error: any) => {
    // a check to see if the error is an authentication error
    // if so, set logout to true
    if (error.statusCode === "403") {
      return {
        logout: true,
        ...error,
      };
    }

    return { error };
  },

  check: async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
    try {
      // Vérifie le token auprès de l'API REST
      await dataProvider.custom({
        url: `${API_BASE_URL}/users/me`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        authenticated: true,
      };
    } catch {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return undefined;
    try {
      // Récupère les infos utilisateur via l'API REST
      const { data } = await dataProvider.custom({
        url: `${API_BASE_URL}/users/me`,
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch {
      return undefined;
    }
  },
};
