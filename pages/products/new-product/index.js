import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../../components/products/Product.module.css";
import Head from "next/head";

const newProduct = () => {
  const router = useRouter();

  const handleBackProducts = () => {
    router.push("/products");
  };

  const nameInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();
  const priceInput = useRef();
  const quantityInput = useRef();
  const categoryInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enterdeDescription = descriptionInput.current.value;
    const enteredImage = imageInput.current.value;
    const enteredPrice = priceInput.current.value;
    const enteredQuantity = quantityInput.current.value;
    const enteredCategory = categoryInput.current.value;

    const productEntered = {
      Name: enteredName,
      Description: enterdeDescription,
      ImageURL: enteredImage,
      Price: enteredPrice,
      Qty: enteredQuantity,
      Category: enteredCategory,
    };
    const res = await axios.post("/api/products", productEntered, {
      headers: { "Content-Type": "application/json" },
    });
    router.push("/products");
  };

  return (
    <div className={style.backProducts}>
      <Head>
        <title>Create New Product</title>
        <meta name="description" content="create new product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div>
        <h2>New Product</h2>
      </div>
      <form className={style.form}>
        <div className={style.control}>
          <input
            type="text"
            placeholder="Name..."
            required
            id="name"
            ref={nameInput}
          />
        </div>

        <div className={style.control}>
          <input
            type="url"
            required
            placeholder="Image Url..."
            id="image"
            ref={imageInput}
          />
        </div>
        <div className={style.control}>
          <input
            type="number"
            placeholder="Price..."
            id="price"
            ref={priceInput}
          />
        </div>
        <div className={style.control}>
          <input
            type="number"
            placeholder="Quantity..."
            id="quantity"
            ref={quantityInput}
          />
        </div>
        <div className={style.control}>
          <input
            type="text"
            placeholder="Category..."
            id="category"
            ref={categoryInput}
          />
        </div>
        <div className={style.control}>
          <textarea
            rows="5"
            placeholder="Description..."
            id="description"
            ref={descriptionInput}
          ></textarea>
        </div>

        <div className={style.actions}>
          <button onClick={handleSubmit}>Add Product</button>
          <button onClick={() => router.push(`/products/`)}>Cancel</button>
        </div>
      </form>
      <div>
        <button onClick={handleBackProducts} className={style.goBack}>
          Back To Products
        </button>
      </div>
    </div>
  );
};

export default newProduct;
