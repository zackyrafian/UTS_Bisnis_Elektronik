"use client"

import Header from '@/components/common/header/header';
import { axiosInstance } from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Link from 'next/link';

const formatToRupiah = (price: number): string => {
  return `Rp. ${price.toLocaleString('id-ID')}`;
};

const Page = () => {
    const [games, setGames] = useState<any[]>([]);
    const params = useParams();
    const itemName = params?.name as string; // Menetapkan tipe string untuk name
    console.log(itemName);


    useEffect(() => {
      const fetch = async () => {
        try{ 
          const response = await axiosInstance.get(`/api/variant/${itemName}`);

          const gamesWithFormattedPrice = response.data.data.map((game: any) => ({
            ...game,
            formattedPrice: formatToRupiah(game.price),
          }));
          setGames(gamesWithFormattedPrice);
        } catch(error) {
        console.error('Failed to fetch games: ', error);
        }
      };
      fetch();
    }, []);

    const handleClick = (game : any) => {
      // Lakukan sesuatu dengan data game yang diklik
      console.log('Product clicked:', game);
    };

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className={styles.content__container}>
          {/* left Side */}
          <div className={styles.side__left}>
            <div>
              <img className={styles.img__header}src='/mk2.png'></img> {/*Ganti pake image di db nanti */}
            </div>
            <div className={styles.title}>
              <h3>{itemName.toUpperCase()}</h3>
            </div>
            <div className={styles.description}>
              <p>
                <Link href='/login'>
                  Login ke Fourteen
                </Link>
                &nbsp;
                akunmu dan dapatkan akses ke promo {itemName}. Belum punya akun Fourteen? 
                <Link href={'/register'}> Daftar sekarang</Link>
              </p>
            </div>
          </div>
          
          {/* RightSide  */}
          <div className={styles.side__right}>
            <div className={styles.userInput}>
              Masukan ID {itemName}
              <div>
                <input className={styles.formInput}></input>
              </div>
            </div>
            <div className={styles.product}>
              <div>
                <h2>Pilih Nominal</h2>
              </div>
              <ul className={styles.productList}>
                {games
                  .sort((a, b) => a.point - b.point)
                  .map((game, index) => (
                    <li key={index} onClick={() => handleClick(game)} className={styles.productItem}>
                      <div className={styles.productContent}>
                        <img className={styles.img__product} src='/VALORANT_Points.png'></img>
                        <p className={styles.productText}>{game.point} Point</p>
                        <p className={styles.productText}>Dari</p>
                        <p className={styles.productText}>{game.formattedPrice}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ); 
};

export default Page;