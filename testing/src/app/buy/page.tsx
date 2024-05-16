"use client"

import React, { useState } from 'react';
import usePayment from '@/hooks/payment';

export interface Variant {
    nominal: string;
    price: string;
  }

const PaymentComponent = () => {
  const [variant, setVariant] = useState<Variant | null>(null);

  const {
    selectedNominal,
    selectedPrice,
    snapLoaded,
    handleVariantSelection,
    handlePayment
  } = usePayment(setVariant);

  const variants = [
    { nominal: '10', price: '10000' },
    { nominal: '20', price: '20000' },
  ];

  console.log(variant)

  return (
    <div>
      <h1>Choose a variant</h1>
      {variants.map((variant, index) => (
        <button
          key={index}
          onClick={() => handleVariantSelection(variant)}
        >
          {variant.nominal} - {variant.price}
        </button>
      ))}

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
  );
};

export default PaymentComponent;
