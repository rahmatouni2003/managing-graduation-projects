import { settings } from "../Config/Settings";


const token = {
  getUserToken: () => localStorage.getItem("token"),
  clearUserTokenData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

const isDevelopment = import.meta.env.DEV;

function getBaseUrl() {
  return isDevelopment ? "/api" : settings.backendServer;
}

function extractResponseData(res) {
  if (!res || typeof res !== "object") return res || [];
  if ("data" in res) return res.data;
  if (Array.isArray(res)) return res;
  return res || [];
}
export async function submitRequestAsync(
  endpoint,
  method = "GET",
  body = null,
  addHeaders = {},
  rawResponse = false,
  isBlob = false // 1. أضفنا هذا الباراميتر هنا
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

    // 2. إذا كان المطلوب ملف (Blob)، نقوم بقراءته مباشرة دون تحويله لنص
    if (response.ok && isBlob) {
      return await response.blob();
    }

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
    
    return rawResponse ? res : extractResponseData(res);
  } catch (error) {
    // ... باقي كود الـ catch كما هو بدون تغيير
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
    throw new Error(errorMsg);
  }
}