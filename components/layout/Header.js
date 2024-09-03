import style from "./Layout.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  return (
    <header className={style.header}>
      <h1>
        NeXT.js <span>App</span>
      </h1>
      <nav className={style.navbar}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/users">Users</Link>
        <Link href="/">About</Link>
        <Link href="/cart">
          <button className={style.subscribe} type="button">
            Cart ({getItemsCount()})
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
