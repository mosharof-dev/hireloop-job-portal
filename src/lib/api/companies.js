import { serverGet } from "../core/server";


// get company profile function
export const getCompanyProfile = async (recruiterId) => {
  return serverGet(`/api/my/companies?recruiterId=${recruiterId}`);
};
