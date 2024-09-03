import { useRouter } from "next/router";
import axios from "axios";
import style from "../../../components/users/User.module.css";
import Head from "next/head";

const DeleteUser = () => {
  const router = useRouter();
  const { userId } = router.query;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      router.push("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.backUsers}>
      <Head>
        <title>Delete User</title>
        <meta name="description" content="delete user" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div>
        <h1>Delete User</h1>
      </div>

      <p>Are you sure you want to delete this User?</p>
      <div className={style.actions}>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => router.push(`/users/${userId}`)}>No</button>
      </div>
    </div>
  );
};

export default DeleteUser;
