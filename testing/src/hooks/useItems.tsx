import { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';

const useItems = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState<string>("");
  const [variant, setVariant] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imagevariant, setImageVariant] = useState<string>("");

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/api/items');
      setItems(response.data.data);
    } catch (error) {
      console.error('Failed to fetch items: ', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axiosInstance.post('/api/items', {
        name,
        variant,
        imagevariant,
        description,
        image
      });
      console.log(response);
      fetchItems();
    } catch (error) {
      console.log(error);
    } 
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/items/${id}`);
      console.log(response);
      fetchItems();
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, name, setName, variant, setVariant, imagevariant ,setImageVariant,description, setDescription, image, setImage, addItem, deleteItem };
};
export default useItems;
