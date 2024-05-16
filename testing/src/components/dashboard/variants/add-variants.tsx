import { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import styles from './add-variant.module.css'


const AddVariantPage: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [point, setPoint] = useState('');
  const [gameNames, setGameNames] = useState<string[] | null>(null); // Set default value to null

  useEffect(() => {
    fetchGameNames();
  }, []);

  const fetchGameNames = async () => {
    try {
      const response = await axiosInstance.get('/api/items');
      setGameNames(response.data.data.map((item: any) => item.name)); // Ambil hanya nama dari setiap item
    } catch (error) {
      console.error('Error fetching game names:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/api/variant', {
        gameName,
        price: parseInt(price),
        point: parseInt(point)
      });
      
      console.log('Variant added successfully:', response.data);
      // Tambahkan logika lainnya, misalnya memberi notifikasi ke pengguna bahwa varian telah ditambahkan
    } catch (error) {
      console.error('Error adding variant:', error);
      // Tambahkan logika untuk menangani kesalahan, misalnya menampilkan pesan kesalahan kepada pengguna
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Add Variant</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Game Name:
          {gameNames ? (
            <select value={gameName} onChange={e => setGameName(e.target.value)}>
              <option value="">Select a game...</option>
              {gameNames.map((game, index) => (
                <option key={index} value={game}>{game.toUpperCase()}</option>
              ))}
            </select>
          ) : (
            <p>Loading...</p>
          )}
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </label>
        <label>
          Points:
          <input type="number" value={point} onChange={e => setPoint(e.target.value)} />
        </label>
        <button type="submit">Add Variant</button>
      </form>
    </div>
  );
};

export default AddVariantPage;
