"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
// import { useState } from "react";
// import Loader from "../../dashboard/loader/Loader";
import Image from "next/image";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  // const [loading, setLoading] = useState(false);
// console.log(state);

  // if(state !== undefined) {
  //   setLoading(false)
  // }
  
  // const handleLoader = () => {
  //   setLoading(true);
  // } onSubmit={handleLoader}

  return (
    <div className={styles.container}>
    {/* {<Loader text={""}/> } */}
    <form action={formAction} className={styles.form}  >
      {/**/}
    <Image className={styles.Img} src={"/ghs.png"} alt="" width="50" height="50"/>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="name" required/>
      <input type="password" placeholder="password" name="password" required/>
      <button>{'Login'}</button>
      {state && state}
    </form>
    </div>
  );
};


export default LoginForm;
