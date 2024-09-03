import Image from "next/image";
import style from "./User.module.css";
import Link from "next/link";

const UsersForm = ({ users }) => {
  return (
    <div className={style.productsList}>
      {users.map((user) => (
        <div className={style.item} key={user._id}>
          <Link href={`users/${user._id}`}>
            <div className={style.image}>
              <Image
                src={user.image}
                layout="fill"
                alt={`user ${user.name} image`}
              />
            </div>
          </Link>
          <div className={style.content}>
            <h3>{user.name}</h3>
            <span>
              {user.birthday !== null ? user.birthday.split("T")[0] : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersForm;
