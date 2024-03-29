import styles from "./ProfileForm.module.scss";

const ProfileForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="new-password">New password</label>
        <input type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
