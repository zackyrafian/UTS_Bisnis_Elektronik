import { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';

interface Variant {
  nominal: string;
  price: string;
}

interface Product {
  id: number;
}

interface PaymentHook {
  selectedNominal: string;
  selectedPrice: string;
  snapLoaded: boolean;
  handleVariantSelection: (variant: Variant) => void;
  handlePayment: () => void;
}

const usePayment = (onSelectVariant: (variant: Variant) => void): PaymentHook => {
  const [selectedNominal, setSelectedNominal] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [snapLoaded, setSnapLoaded] = useState<boolean>(false);
  const product: Product = { 
    id: Math.floor(Math.random() * 100 ) + 1,
  };

  useEffect(() => {
    const snapScript = document.createElement('script');
    snapScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    snapScript.setAttribute('data-client-key', process.env.NEXT_PUBLIC_CLIENT || '');
    snapScript.async = true;

    snapScript.onload = () => {
      console.log('Snap.js library loaded');
      setSnapLoaded(true);
    };

    document.body.appendChild(snapScript);

    return () => {
      document.body.removeChild(snapScript);
    };
  }, []);

  const handleVariantSelection = (variant: Variant) => {
    onSelectVariant(variant);
    setSelectedNominal(variant.nominal);
    setSelectedPrice(variant.price);
  };

  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post('/api/createTransaction', {
        itemId: product.id,
        nominal: selectedNominal,
        price: selectedPrice,
      });

      const { token } = response.data;
      console.log({token});

      if (snapLoaded && (window as any).snap && typeof (window as any).snap.pay === 'function') {
        console.log('Before window.snap.pay');
        (window as any).snap.pay(token, {
          onSuccess: function (result: any) {
            console.log('Payment success', result);
          },
          onPending: function (result: any) {
            console.log('Payment pending', result); 
          },
          onError: function (result: any) {
            console.log('Payment error', result);
          },
          onClose: function () {
            console.log('Popup closed without completion');
          },
        });
        console.log('After window.snap.pay');
      } else {
        console.error('Snap.js is not defined or missing pay function');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating transaction');
    }
  };

  return {
    selectedNominal,
    selectedPrice,
    snapLoaded,
    handleVariantSelection,
    handlePayment,
  };
};

export default usePayment;
