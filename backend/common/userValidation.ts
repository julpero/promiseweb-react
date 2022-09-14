import { validate as uuidValidate } from "uuid";

export const isValidAdminUser = (userName: string, uuid: string): boolean => {
  if (!userName || !uuid) return false;
  if (userName.length < 4) return false;
  if (!uuidValidate(uuid)) return false;

  // check that user name is in admin list
  console.log("admin login...");
  const adminsStr = process.env.ADMIN_USER_NAME;
  if (!adminsStr) return false;
  const admins = adminsStr.split(",");
  if (!admins.some(admin => admin === userName)) {
    console.warn("... user name is not admin!");
    return false;
  }

  return true;
};
