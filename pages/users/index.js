import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../components/users/User.module.css";
import UsersForm from "../../components/users/UsersForm";
import SearchItems from "../../components/products/SearchItems";
import Head from "next/head";
import { dbConnect } from "@/db/connect";
import User from "../../models/User";

const Users = ({ users }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filterList = users.filter((user) =>
    user?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const AddNewUser = () => {
    router.push("users/new-user");
  };

  return (
    <div className={style.users}>
      <Head>
        <title>Users</title>
        <meta name="description" content="our users" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.top}>
        <h1 className={style.mainTitle}>Users</h1>
      </div>
      <SearchItems search={search} setSearch={setSearch} />
      <div className={style.AddNew_Number}>
        <div className={style.addNewUser}>
          <button onClick={AddNewUser}>Add New User</button>
        </div>
        <div className={style.mainTitleNumber}>{filterList.length}</div>
      </div>

      <UsersForm users={filterList} />
    </div>
  );
};

export default Users;

export const getServerSideProps = async () => {
  await dbConnect();
  const resUsers = await User.find();
  const usersData = JSON.parse(JSON.stringify(resUsers));

  return {
    props: {
      users: usersData,
    },
  };
};
