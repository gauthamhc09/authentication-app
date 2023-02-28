import { useRef, useState } from 'react';
import { signIn } from "next-auth/react"
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef('');
  const passwordRef = useRef('');

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function createUser(email, password) {
    const result = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = result.json();

    if (data.message !== 'ok') {
      console.log(data.message || 'Something went wrong')
    }

    return data;
  }
  async function sendingDataHandler(e) {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (isLogin) {
      //write function for login
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password
      })
      console.log('result', result)
    } else {
      try {
        const result = await createUser(email, password)
        return result;
      } catch (err) {
        console.log(err)
      }

    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={sendingDataHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
