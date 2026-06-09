import { serverGet } from "../core/server";

export const getApplicationByApplicant = async (applicantId) => {
  return serverGet(`/api/application?applicantId=${applicantId}`);
};
