import { useRef } from 'react';
import classes from './profile-form.module.css';

async function changePassword(oldPassword, newPassword) {

  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // const contentType = response.headers.get('content-type');
  // if (!contentType || !contentType.includes('application/json')) {
  //   throw new TypeError('Response was not JSON');
  // }
  // return response.json();
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data;

}

function ProfileForm() {
  const newPasswordRef = useRef('');
  const oldPasswordRef = useRef('');

  async function changePasswordHandler(e) {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const result = await changePassword(enteredOldPassword, enteredNewPassword);
      console.log('result', result);
      return result;
    } catch (err) {
      console.log('err', err)
    }

  }

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
