import { redirect } from "next/navigation";
import { getToken } from "./session";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const authHeader = async () => {
  const token = await getToken();
  const headers = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return headers;
};

export const serverGet = async (path) => {
  try {
    const res = await fetch(`${API_URL}${path}`);
    return handleStatus(res);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${API_URL}${path}`, {
    headers: await authHeader(),
  });

  return handleStatus(res);
};

//  generic server mutation function for creating and updating data
export const serverMutation = async (path, newData, method = "POST") => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(newData),
    });

    console.log("status code", res.status);
    return handleStatus(res);
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

const handleStatus = (res) => {
  if (res.status == 401) {
    redirect("/unauthorized");
  }

  if (res.status == 403) {
    redirect("/unauthorized");
  }

  return res.json();
};
