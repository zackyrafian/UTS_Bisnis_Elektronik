"use client"
import Header from '@/components/common/header/header';
import { axiosInstance } from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import usePayment from '@/hooks/payment';
import Variant from '@/hooks/payment';

const formatToRupiah = (price: number): string => {
  return `Rp. ${price.toLocaleString('id-ID')}`;
};

export interface Variant {
  nominal: string;
  price: string;
}

const Page = () => {
  const [items, setItems] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const params = useParams();
  const itemName = params?.name as string;

  const { selectedNominal, selectedPrice, snapLoaded, handleVariantSelection, handlePayment } = usePayment(setSelectedGame);

  useEffect(() => {
    const itemfetch = async () => {
      try {
        const response = await axiosInstance.get(`/api/items/${itemName}`);
        setItems(response.data.data);
      } catch (error) {
        console.error('Failed to fetch items: ', error);
      }
    };

    itemfetch();
  }, [itemName]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(`/api/variant/${itemName}`);

        const gamesWithFormattedPrice = response.data.data.map((game: any) => ({
          ...game,
          formattedPrice: formatToRupiah(game.price),
        }));
        setGames(gamesWithFormattedPrice);
      } catch (error) {
        console.error('Failed to fetch games: ', error);
      }
    };
    fetch();
  }, [itemName]);

  const handleClick = (game: any) => {
    setSelectedGame(game);
    handleVariantSelection({ nominal: game.point, price: game.price });
    console.log('Product clicked:', game);
    console.log('Product Price : ', game.price);

    console.log('snapLoaded:', snapLoaded);
    console.log('selectedNominal:', selectedNominal);
    console.log('selectedPrice:', selectedPrice);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.content__container}>
        {/* Left Side */}
        <div className={styles.side__left}>
          {items.map((item) => (
            <div key={item.id}>
              <img className={styles.img__header} src={`/uploads/${item.imagebackground}`} alt={item.name}></img>
            </div>
          ))}
          <div className={styles.left__title}>
            <h3>{itemName.toUpperCase()}</h3>
          </div>
          <div className={styles.description}>
            <p>
              <Link href="/login">
                Login ke Fourteen&nbsp;
              </Link>
              akunmu dan dapatkan akses ke promo {itemName}. Belum punya akun Fourteen?
              <Link href="/register"> Daftar sekarang</Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.side__right}>
          <div className={styles.userInput}>
            <h2 className={styles.title}>Masukan ID {itemName.toUpperCase()} Anda</h2>
            <div>
              <input placeholder={"Username"}className={styles.formInput} />
            </div>
          </div>
          <div className={styles.product}>
            <div>
              <h3 className={styles.title}>Pilih Nominal</h3>
            </div>
            <ul className={styles.productList}>
              {games
                .sort((a, b) => a.price - b.price)
                .map((game, index) => (
                  <li key={index} onClick={() => handleClick(game)} className={styles.productItem}>
                    {items.map((item) => (
                      <div key={item.id} className={styles.productContent}>
                        {item.imagevariant && (
                          <img className={styles.img__product} src={`/uploads/${item.imagevariant}`} alt={item.name}></img>
                        )}
                        <p className={styles.productText}>{game.point} {item.variant}</p>
                        <p className={styles.productText}>Dari</p>
                        <p className={styles.productText}>{game.formattedPrice}</p>
                      </div>
                    ))}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.payments}>
            <h2 className={styles.title}>Pilih Pembayaran</h2>
            {selectedNominal && selectedPrice && (
              <div>
                <p>Selected Nominal: {selectedNominal}</p>
                <p>Selected Price: {selectedPrice}</p>
                <button onClick={handlePayment} disabled={!snapLoaded}>
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
