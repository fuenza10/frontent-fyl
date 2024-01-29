import { del } from "../..";

export const deleteCompany = async (id: string) => {
  return await del(`companies/${id}`);
};
