import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../../components/users/User.module.css";
import Head from "next/head";

const newUser = () => {
  const [gender, setGender] = useState("male");
  const [role, setRole] = useState("user");

  const router = useRouter();

  const handleBackUsers = () => {
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
    const res = await axios.post("/api/users", userEntered, {
      headers: { "Content-Type": "application/json" },
    });
    router.push("/users");
  };

  return (
    <div className={style.backUsers}>
      <Head>
        <title>Create New User</title>
        <meta name="description" content="create new user" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div>
        <h2>New User</h2>
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
            type="text"
            placeholder="UserName..."
            id="username"
            ref={usernameInput}
          />
        </div>
        <div className={style.control}>
          <input
            type="text"
            placeholder="Password..."
            id="name"
            ref={passwordInput}
          />
        </div>

        <div className={style.control}>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            ref={emailInput}
          />
        </div>

        <div className={style.control}>
          <input
            type="text"
            placeholder="Phone..."
            id="phone"
            ref={phoneInput}
          />
        </div>
        <div className={style.control}>
          <input
            type="date"
            placeholder="Birthday..."
            id="birthday"
            ref={birthdayInput}
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
          <button onClick={handleSubmit}>Add User</button>
          <button onClick={() => router.push(`/users/`)}>Cancel</button>
        </div>
      </form>
      <div>
        <button onClick={handleBackUsers} className={style.goBack}>
          Back To User
        </button>
      </div>
    </div>
  );
};

export default newUser;
