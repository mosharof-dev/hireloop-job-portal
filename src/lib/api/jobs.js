import { serverGet } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const getAllJobs = async (searchParams = {}) => {
  const query = new URLSearchParams(searchParams).toString();
  const url = query ? `/api/jobs?${query}` : `/api/jobs`;
  return serverGet(url);
};
export const getJobById = async (jobId) => {
  return serverGet(`/api/jobs/${jobId}`);
};
// get company all jobs function
export const getCompanyJobs = async (companyId, status = "active") => {
  try {
    const res = await fetch(
      `${API_URL}/api/jobs?companyId=${companyId}&status=${status}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    throw error;
  }
};
