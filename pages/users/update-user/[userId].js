import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../../components/users/User.module.css";
import Head from "next/head";

const UpdateUser = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [gender, setGender] = useState("male");
  const [role, setRole] = useState("user");

  const goToUsers = () => {
    router.push("/users");
  };

  const nameInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();

  const birthdayInput = useRef();
  const userInput = useRef();
  const adminInput = useRef();
  const maleInput = useRef();
  const femaleInput = useRef();
  const imageInput = useRef();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        const userData = res.data;
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredUsername = usernameInput.current.value;
    const enteredPassword = passwordInput.current.value;
    const enteredEmail = emailInput.current.value;
    const enteredPhone = phoneInput.current.value;

    const enteredBirthday = birthdayInput.current.value;
    const enteredRole =
      role === "user" ? userInput.current.value : adminInput.current.value;
    const enteredGender =
      gender === "male" ? maleInput.current.value : femaleInput.current.value;
    const enteredImage = imageInput.current.value;

    const userEntered = {
      name: enteredName,
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
      phone: enteredPhone,
      birthday: enteredBirthday,
      role: enteredRole,
      gender: enteredGender,
      image: enteredImage,
    };

    const res = await axios.put(`/api/users/${userId}`, userEntered, {
      headers: { "Content-Type": "application/json" },
    });
    router.push("/users/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.backUsers}>
      <Head>
        <title>Update User</title>
        <meta name="description" content="update user" />
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
            defaultValue={user.name}
          />
        </div>
        <div className={style.control}>
          <input
            type="text"
            placeholder="UserName..."
            id="username"
            ref={usernameInput}
            defaultValue={user.username}
          />
        </div>
        <div className={style.control}>
          <input
            type="text"
            placeholder="Password..."
            id="name"
            ref={passwordInput}
            defaultValue={user.password}
          />
        </div>

        <div className={style.control}>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            ref={emailInput}
            defaultValue={user.email}
          />
        </div>

        <div className={style.control}>
          <input
            type="text"
            placeholder="Phone..."
            id="phone"
            ref={phoneInput}
            defaultValue={user.phone}
          />
        </div>
        <div className={style.control}>
          <input
            type="date"
            placeholder="Birthday..."
            id="birthday"
            ref={birthdayInput}
            defaultValue={user.birthday}
          />
        </div>

        <div className={style.checkBox}>
          <div className={style.formCheck}>
            <input
              type="radio"
              value="user"
              id="radioDefault1"
              name="role"
              checked={role === "user"}
              ref={userInput}
              onChange={() => setRole("user")}
            />
            <label htmlFor="radioDefault1">User</label>
          </div>
          <div className={style.formCheck}>
            <input
              type="radio"
              value="admin"
              id="radioDefault2"
              name="role"
              checked={role === "admin"}
              ref={adminInput}
              onChange={() => setRole("admin")}
            />
            <label htmlFor="radioDefault2">Admin</label>
          </div>
        </div>
        <div className={style.checkBox}>
          <div className={style.formCheck}>
            <input
              type="radio"
              value="male"
              id="radioDefault1"
              name="gender"
              checked={gender === "male"}
              ref={maleInput}
              onChange={() => setGender("male")}
            />
            <label htmlFor="radioDefault1">Male</label>
          </div>
          <div className={style.formCheck}>
            <input
              type="radio"
              value="female"
              id="radioDefault2"
              name="gender"
              checked={gender === "female"}
              ref={femaleInput}
              onChange={() => setGender("female")}
            />
            <label htmlFor="radioDefault2">Female</label>
          </div>
        </div>

        <div className={style.control}>
          <input
            type="text"
            required
            placeholder="Image Url..."
            id="image"
            ref={imageInput}
          />
        </div>

        <div className={style.actions}>
          <button onClick={handleSubmit}>Edit User</button>
          <button onClick={goToUsers}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
