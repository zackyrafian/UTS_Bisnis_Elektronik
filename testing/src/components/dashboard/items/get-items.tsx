import React, { useState } from 'react';
import useItems from '@/hooks/useItems';
import styles from './items.module.css';
import { axiosInstance } from '@/lib/axios';

const ItemsPage = () => {
  const { items, name, setName, variant, setVariant, description, setDescription, image, setImage, addItem, deleteItem } = useItems();

  const [itemvariant , setItemVariant] = useState<any[]>([]);

  const handleNameClick = async (itemName: string) => {
    try {
      const response = await axiosInstance.get(`/api/variant/${itemName}`);
      setItemVariant(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching variant:', error);
    }
  };

  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>
      <table className={styles.itemTable}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>VARIANT</th>
            <th>DESCRIPTION</th>
            <th>IMAGE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: { id: string, name: string, variant: string, description: string, image: string }) => (
            <tr key={item.id}>
              <td>
                <span 
                  className={styles.nameLink}
                  onClick={() => handleNameClick(item.name)}
                >
                  {item.name.toUpperCase()}
                </span>
                {itemvariant && itemvariant.find(variant => variant.itemName === item.name) && (
                  <table>
                  <thead>
                    <tr>
                      <th>{item.variant.toUpperCase()}</th>
                      <th>PRICE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemvariant.map((variant: { point: string, price: string }) => (
                      <tr key={variant.point}>
                        <td>{variant.point}</td>
                        <td>{variant.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </td>
              <td>{item.variant}</td>
              <td>{item.description}</td>
              <td>{item.image}</td>
              <td><button onClick={() => deleteItem(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsPage;
