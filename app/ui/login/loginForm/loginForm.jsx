"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useState } from "react";
import Loader from "../../dashboard/loader/Loader";
import Image from "next/image";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); 
    setError(null); 

    const data = {
      name : event.target.name.value.trim(),
      password : event.target.password.value
    }

    try {
      const result = await authenticate(data); 
      
      setLoading(false);

      if(result !== undefined && result.status === 'failed') {
        setError(result.msg);
      }else{
        setError(null)
      }

    } catch (err) {
      console.error("Login error:", err);
      setError({ status: "failed", msg: err.message || "An error occurred" }); // Set error message
    } finally {
      setLoading(false); // Set loader to false regardless of success/failure
    }
  };

  return (
    <div className={styles.container}>
    {loading && <Loader text={""}/> }
    
    <form  className={styles.form}  onSubmit={handleSubmit}>
      {/**/}
    <Image className={styles.Img} src={"/ghs.png"} alt="" width="50" height="50"/>
      {error && error != null ? <p className={styles.error}>{error}</p> : <h1>Login</h1>}
      <input type="text" placeholder="username" name="name" required/>
      <input type="password" placeholder="password" name="password" required/>
      <button>{loading ? 'Logging User':'Login'}</button>
    </form>
    </div>
  );
};


export default LoginForm;
