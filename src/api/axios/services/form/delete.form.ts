import { del } from "../.."
export const deleteForm = (id:string) => {
    del(`/forms/${id}`)
}