import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../../../components/products/Product.module.css";
import Head from "next/head";

const UpdateProduct = () => {
  const router = useRouter();
  const { productId } = router.query;

  const goToProducts = () => {
    router.push("/products");
  };

  const nameInput = useRef();
  const descriptionInput = useRef();
  const imageInput = useRef();
  const priceInput = useRef();
  const quantityInput = useRef();
  const categoryInput = useRef();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        const productData = res.data;
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredDescription = descriptionInput.current.value;
    const enteredImage = imageInput.current.value;
    const enteredPrice = priceInput.current.value;
    const enteredQuantity = quantityInput.current.value;
    const enteredCategory = categoryInput.current.value;

    const updatedProduct = {
      Name: enteredName,
      Description: enteredDescription,
      ImageURL: enteredImage,
      Price: enteredPrice,
      Qty: enteredQuantity,
      Category: enteredCategory,
    };

    const res = await axios.put(`/api/products/${productId}`, updatedProduct, {
      headers: { "Content-Type": "application/json" },
    });
    router.push("/products/");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.backProducts}>
      <Head>
        <title>Update Product</title>
        <meta name="description" content="update product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <form className={style.form}>
        <div className={style.control}>
          <input
            type="text"
            placeholder="Name..."
            required
            id="name"
            ref={nameInput}
            defaultValue={product.Name}
          />
        </div>

        <div className={style.control}>
          <input
            type="url"
            required
            placeholder="Image URL..."
            id="image"
            ref={imageInput}
            defaultValue={product.ImageURL}
          />
        </div>

        <div className={style.control}>
          <input
            type="number"
            placeholder="Price..."
            id="price"
            ref={priceInput}
            defaultValue={product.Price}
          />
        </div>

        <div className={style.control}>
          <input
            type="number"
            placeholder="Quantity..."
            id="quantity"
            ref={quantityInput}
            defaultValue={product.Qty}
          />
        </div>

        <div className={style.control}>
          <input
            type="text"
            placeholder="Category..."
            id="category"
            ref={categoryInput}
            defaultValue={product.Category}
          />
        </div>

        <div className={style.control}>
          <textarea
            rows="5"
            placeholder="Description..."
            id="description"
            ref={descriptionInput}
            defaultValue={product.Description}
          ></textarea>
        </div>

        <div className={style.actions}>
          <button onClick={handleSubmit}>Edit Product</button>
          <button onClick={goToProducts}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;