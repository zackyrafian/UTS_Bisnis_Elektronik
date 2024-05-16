"use client"
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './promotionslider.module.css'; // Import CSS module file

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className={styles.sliderContainer}>
      <Carousel
        autoPlay={true} // Otomatis putar slider
        showArrows={false} // Tampilkan tombol panah navigasi
        showStatus={false} // Tampilkan status slider (mis. "3 dari 5")
        showThumbs={false}
        showIndicators={true} // Tampilkan indikator titik-titik navigasi
        infiniteLoop={true} // Putar slider secara tak terbatas
        interval={5000} // Interval waktu antara setiap perputaran slider (dalam milidetik)
        transitionTime={500} // Waktu transisi antara slide (dalam milidetik)
        stopOnHover={true} // Berhenti berputar saat kursor mouse berada di atasnya
      >
        {images.map((image, index) => (
          <div className={styles.slide} key={index}>
            <img className={styles.sliderImage} src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
