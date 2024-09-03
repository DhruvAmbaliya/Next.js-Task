import { useRouter } from "next/router";
import axios from "axios";
import style from "../../../../components/products/Product.module.css";
import Head from "next/head";

const DeleteProduct = () => {
  const router = useRouter();
  const { productId } = router.query;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.backProducts}>
      <Head>
        <title>Delete Product</title>
        <meta name="description" content="delete product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div>
        <h1>Delete Product</h1>
      </div>

      <p>Are you sure you want to delete this product?</p>
      <div className={style.actions}>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => router.push(`/products/${productId}`)}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
