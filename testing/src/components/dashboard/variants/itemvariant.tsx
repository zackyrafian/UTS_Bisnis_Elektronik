import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

const ItemVariants = () => { 

    const [items , setItems] = useState<any[]>([]);

    useEffect(() => {
        const itemfetch = async () => {
            try {   
                const fetch = await axiosInstance.get(`/api/variant/${name}`)
                setItems(fetch.data.data);
            }catch (e) {
              console.error('Failed to fetch items: ', e);
            }
        };
        itemfetch();
    }, [])
    return (
        <div>

        </div>
    )
}

export default ItemVariants;