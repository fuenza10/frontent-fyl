import { patch, put } from '../..';


export  const updateUser = async ( data: any) => {
  return await put("users/profile", data);
};

export  const updatePassword = async ( data: any) => {
    return await patch("users/profile", data);
    };