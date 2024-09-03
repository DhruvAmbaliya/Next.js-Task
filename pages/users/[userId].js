import style from "../../components/users/User.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import { dbConnect } from "@/db/connect";
import Users from "../../models/User";
import mongoose from "mongoose";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const handleBackUsers = () => {
    router.push("/users");
  };

  const handleGoToUpdate = () => {
    router.push(`/users/update-user/${userId}`);
  };

  const handleGoToDelete = () => {
    router.push(`/users/delete-user/${userId}`);
  };

  return (
    <div className={style.details}>
      <Head>
        <title>User: {user.name}</title>
        <meta name="description" content="one user" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.imageContainer}>
        <Image src={user.image} alt={user.name} width={600} height={400} />
      </div>
      <div className={style.allDetails}>
        <div className={style.namePriceDetails}>
          <h1>{user.name}</h1>
          <span>UserName: {user.username}</span>
          <span>Password: {user.password}</span>
          <span>Email: {user.email}</span>
          <span>Phone: {user.phone}</span>
          <span>
            {user.birthday !== null ? user.birthday.split("T")[0] : ""}
          </span>
          <span>Gender: {user.gender}</span>
          <span>Role: {user.role}</span>
        </div>
        <div className={style.updateAndDelete}>
          <div className={style.actions}>
            <button onClick={handleGoToUpdate}>Edit User</button>
          </div>
          <div className={style.actionsDelete}>
            <button onClick={handleGoToDelete}>Delete User</button>
          </div>
        </div>

        <div>
          <button onClick={handleBackUsers} className={style.goBack}>
            Back To Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;

export const getStaticPaths = async () => {
  dbConnect();
  const usersPath = await Users.find({}, { _id: 1 });

  return {
    fallback: "blocking",
    paths: usersPath.map((user) => ({
      params: { userId: user._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const userId = context.params.userId;

  dbConnect();
  const selectedUser = await Users.findById({
    _id: new mongoose.Types.ObjectId(userId),
  });

  const userData = JSON.parse(JSON.stringify(selectedUser));

  return {
    props: {
      user: userData,
    },
  };
};
