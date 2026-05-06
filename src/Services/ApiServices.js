import { settings } from "../Config/Settings";
import { toast } from "react-hot-toast";

const token = {
  getUserToken: () => "mock-token",
  clearUserTokenData: () => {}
};

const isDevelopment = import.meta.env.DEV;

function getBaseUrl() {
  return isDevelopment ? "/api" : settings.backendServer;
}

function extractResponseData(res) {
  if (res && typeof res === "object" && "data" in res) return res.data;
  if (Array.isArray(res)) return res;
  return res || [];
}

let toastVisible = false;

const showToastOnce = (message) => {
  if (toastVisible) return;
  toastVisible = true;
  toast.error(message);
  setTimeout(() => {
    toastVisible = false;
  }, 3000);
};

export async function submitRequestAsync(
  endpoint,
  method = "GET",
  body = null,
  addHeaders = {}
) {
  const baseUrl = getBaseUrl();

  const url = `${baseUrl}/${endpoint}`
    .replace(/\/+/g, "/")
    .replace(":/", "://");
  const isFormData = body instanceof FormData;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token.getUserToken()}`,
    ...(!isFormData && {
      "Content-Type": "application/json; charset=utf-8",
    }),
    ...addHeaders,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body:
        method !== "GET"
          ? isFormData
            ? body
            : JSON.stringify(body || {})
          : undefined,
    });

    let res;

    if (response.status !== 204) {
      const text = await response.text();
      try {
        res = JSON.parse(text);
      } catch {
        res = text;
      }
    } else {
      res = {};
    }

    if (!response.ok) {
      const errorMsg =
        res?.message || `Error ${response.status}: Request failed`;
      throw new Error(errorMsg);
    }

    return extractResponseData(res);
  } catch (error) {
    let errorMsg = "";

    if (error.message.includes("401")) {
      token.clearUserTokenData();
      errorMsg = "Session expired, please login again.";
    } else if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      errorMsg = "Network issue! Please check your connection.";
    } else {
      errorMsg = error.message || "Unexpected error occurred";
    }

    showToastOnce(errorMsg);
    throw error;
  }
}