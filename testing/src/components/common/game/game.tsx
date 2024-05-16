"use client"
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';
import styles from './game.module.css'

const GameComponents: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/api/items');
        setGames(response.data.data);
      } catch (error) {
        console.error('Failed to fetch games: ', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Games</h1>
      <div className={styles.content__container}>
        {games.map((game) => (
            <Link key={game.name} className={styles.content} href={{pathname: `/game/${game.name}`}}>
              <div className={styles.gameContainer}>
                <img className={styles.gameImage} src={`/uploads/${game.image}`} alt={game.name} />
                <p className={styles.title}>{game.name.toUpperCase()}</p>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default GameComponents;
