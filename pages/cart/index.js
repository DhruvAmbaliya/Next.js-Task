import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import style from "../../components/products/Product.module.css";
import Head from "next/head";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.Price,
      0
    );
  };

  return (
    <div className={style.cartContainer}>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="shopping cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <h1>Cart Items</h1>

      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={style.cartHeader}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map((item) => (
            <div className={style.cartBody} key={item._id}>
              <div className={style.cartImage}>
                <Image
                  src={item.ImageURL}
                  height={90}
                  width={65}
                  alt={`product ${item._id} image`}
                />
              </div>
              <p>{item.Name}</p>
              <p>$ {item.Price}</p>
              <p>{item.quantity}</p>
              <div className={style.cartButtons}>
                <button onClick={() => dispatch(incrementQuantity(item._id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item._id))}>
                  -
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className={style.remove}
                >
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.Price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
