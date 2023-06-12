// stores
import { CartContext } from 'contexts';
import { useContext, useState } from 'react';

export const useDiscountCode = (code) => {
  const [lastCode, setLastCode] = useState(null);
  const { addDiscount } = useContext(CartContext);

  if (!code) return false;

  if (lastCode === code) return code;

  /* console.log(code); */

  addDiscount({ discountCode: code })
    .then(() => {
      setLastCode(code);
    })
    .catch(() => {
      setLastCode(null);
    });

  return lastCode;
};
