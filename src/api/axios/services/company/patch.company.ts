import { patch } from "../..";


export  const patchCompany = async (id: string, data: any) => {
  return await patch(`companies/${id}`, data);
};
