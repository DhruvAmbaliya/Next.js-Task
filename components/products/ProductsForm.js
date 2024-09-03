import Image from "next/image";
import style from "./Product.module.css";
import Link from "next/link";

const ProductsForm = ({ products }) => {
  return (
    <div className={style.productsList}>
      {products.map((product) => (
        <div className={style.item} key={product.id}>
          <Link href={`products/${product.id}`}>
            <div className={style.image}>
              <Image
                src={product.image}
                layout="fill"
                alt={`product ${product.name} image`}
              />
            </div>
          </Link>
          <div className={style.content}>
            <h3>{product.name}</h3>
            <span>${product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsForm;
