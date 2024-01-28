import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import StaycationLogo from "./StaycationLogo";

interface User {
  firstName: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    fetch(`${process.env.API_URL}/users/1`)
      .then(async (res: { json: () => User | PromiseLike<User> }) => {
        const result: User = await res.json();
        setUser(result);
      })
      .catch((e) => console.warn("Error: ", e));
  }, []);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <StaycationLogo color="#F36" />
        {user && (
          <div className={styles.headerText}>Welcome, {user.firstName}!</div>
        )}
      </div>
    </div>
  );
};

export default Header;
