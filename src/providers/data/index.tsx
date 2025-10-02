import simpleRestDataProvider, { axiosInstance } from "@refinedev/simple-rest";
import { DataProvider, HttpError } from "@refinedev/core";

export const API_BASE_URL = "http://127.0.0.1:8000/v1";

// Ajout du token dans toutes les requêtes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Récupération du dataProvider original
const baseDataProvider = simpleRestDataProvider(API_BASE_URL, axiosInstance);

// Surcharge de la méthode getList
const customGetList: DataProvider["getList"] = async ({
  resource,
  pagination,
  filters,
  sorters,
  meta,
}) => {
  try {
    const page = pagination?.current ?? 1;
    const pageSize = pagination?.pageSize ?? 10;

    const response = await axiosInstance.get(`${API_BASE_URL}/${resource}/`, {
      params: {
        page,
        page_size: pageSize,
      },
    });

    const { results, count } = response.data;

    if (!Array.isArray(results)) {
      throw new Error(
        "Invalid response format: expected 'results' to be an array."
      );
    }

    return {
      data: results,
      total: count,
    };
  } catch (e: any) {
    const httpError: HttpError = {
      message:
        e?.response?.data?.message || e.message || "Erreur lors du chargement",
      name: e?.name || "getListError",
      statusCode: e?.response?.status || 500,
    };

    throw httpError;
  }
};

// Fusion des méthodes : on remplace uniquement getList
export const dataProvider: DataProvider = {
  ...baseDataProvider,
  getList: customGetList,
};
