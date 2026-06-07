import { serverGet } from "../core/server";
import { getUserSession } from "../core/session";

// get company profile function
export const getCompanyProfile = async (recruiterId) => {
  const companies = await serverGet(
    `/api/my/companies?recruiterId=${recruiterId}`,
  );
  return companies.length > 0 ? companies[0] : null;
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return  getCompanyProfile(user?.id);
};
