"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  Fetch create company function
export const createCompany = async (newCompanyData) => {
  return await serverMutation("/api/companies", newCompanyData);
};

// Updated Company
export const updateCompany = async (id, data) => {
  const res = await serverMutation(`/api/companies/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/companies");
  return res;
};
