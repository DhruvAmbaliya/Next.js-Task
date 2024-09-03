import style from "../../../components/products/Product.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";
import Head from "next/head";
import Image from "next/image";
import { dbConnect } from "@/db/connect";
import Products from "../../../models/Product";
import mongoose from "mongoose";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productId } = router.query;

  const handleBackProducts = () => {
    router.push("/products");
  };

  const handleGoToUpdate = () => {
    router.push(`/products/update-product/${productId}`);
  };

  const handleGoToDelete = () => {
    router.push(`/products/delete-product/${productId}`);
  };

  return (
    <div className={style.details}>
      <Head>
        <title>Product</title>
        <meta name="description" content="one product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.imageContainer}>
        <Image
          src={product.ImageURL}
          alt={product.Name}
          width={600}
          height={400}
        />
      </div>
      <div className={style.allDetails}>
        <div className={style.namePriceDetails}>
          <h1>{product.Name}</h1>
          <span>${product.Price}</span>
          <div className={style.description}>
            <p>{product.Description}</p>
          </div>
        </div>
        <div className={style.updateAndDelete}>
          <div className={style.actions}>
            <button onClick={handleGoToUpdate}>Edit Product</button>
          </div>
          <div className={style.actionsDelete}>
            <button onClick={handleGoToDelete}>Delete Product</button>
          </div>
        </div>
        <div>
          <button
            key={product._id}
            onClick={() => dispatch(addToCart(product))}
            className={style.addToCart}
          >
            Add To Cart
          </button>
        </div>
        <div>
          <button onClick={handleBackProducts} className={style.goBack}>
            Back To Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  dbConnect();
  const productsPath = await Products.find({}, { _id: 1 });

  return {
    fallback: "blocking",
    paths: productsPath.map((product) => ({
      params: { productId: product._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const productId = context.params.productId;

  dbConnect();
  const selectedProduct = await Products.findById({
    _id: new mongoose.Types.ObjectId(productId),
  });

  const productData = JSON.parse(JSON.stringify(selectedProduct));

  return {
    props: {
      product: productData,
    },
  };
};
