import { get } from "../.."


export const findOneUser = ()=> {
  
  get(`/users/me`).then((response) => {
    if (response === null) {
      throw new Error('Response is null');
    }

    return response;
  });
}