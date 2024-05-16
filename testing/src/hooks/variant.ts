import { axiosInstance } from "@/lib/axios"
import { useState } from "react"

const useVariant = () => {

    const deleteItem = async (id: string) => {
        try  {
            const response = await axiosInstance.delete(`/api/variant/${id}`);
            console.log(response);
        } catch (e) { 
            console.error(e);
        }
    }
}

export default useVariant;

