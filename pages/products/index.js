import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../components/products/Product.module.css";
import ProductsForm from "../../components/products/ProductsForm";
import SearchItems from "../../components/products/SearchItems";
import Head from "next/head";
import { dbConnect } from "@/db/connect";
import Product from "../../models/Product";

const Products = ({ products }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filterList = products.filter((item) =>
    item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const AddNewProduct = () => {
    router.push("products/new-product");
  };

  return (
    <div className={style.products}>
      <Head>
        <title>Products</title>
        <meta name="description" content="out products" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.top}>
        <h1 className={style.mainTitle}>Our Products</h1>
      </div>
      <SearchItems search={search} setSearch={setSearch} />
      <div className={style.AddNew_Number}>
        <div className={style.addNewProduct}>
          <button onClick={AddNewProduct}>Add New Product</button>
        </div>
        <div className={style.mainTitleNumber}>{filterList.length}</div>
      </div>

      <ProductsForm products={filterList} />
    </div>
  );
};

export default Products;

export const getServerSideProps = async () => {

  await dbConnect();
  const productsData = await Product.find();

  return {
    props: {
      products: productsData.map((product) => ({
        id: product._id.toString(),
        name: product.Name,
        description: product.Description,
        image: product.ImageURL,
        price: product.Price,
        quantity: product.Qty,
        category: product.Category,
      })),
    },
  };
};
