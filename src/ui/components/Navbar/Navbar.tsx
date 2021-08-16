import classNames from "classnames";
import Link from "next/link";
import { useAppSelector } from "../../../core/store/hooks";

import buttons from "../../style/buttons.module.scss";
import Avatar from "../StoriesAvatar/StoriesAvatar";

import styles from "./Navbar.module.scss";


export interface NavbarProps {
  initialLanguage?: "en" | "ua" | "ru";
  variant: "Homepage" | "Profilepage" | "LoginPage";
}

const Navbar: React.FC<NavbarProps> = ({ variant }) => {
  const style = {
    width: 40,
    height: 40,
  };

  const isHomePage = variant === "Homepage";
  const showLanguageDrop = variant === "Homepage" || variant === "LoginPage";
  const showHomeButton = variant === "Profilepage";

  const avatarUrl = useAppSelector((state) => state.profile.profile?.avatar?.url)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Linkstagram</div>

      <div className={styles.buttons}>
        {showHomeButton && (
          <Link href="/">
            <button className={classNames(buttons.blackBtn, buttons.hideable)} type="submit">
              Home
            </button>
          </Link>
        )}
        {isHomePage && (
          <Link href="/">
            <button className={buttons.blackBtn} type="button">
              Home
            </button>
          </Link>
        )}

        {showLanguageDrop && <button type="button" className={classNames(buttons.whiteBtn, 'hideable')}>en</button>}

        {isHomePage && (
          <Link href="/profile">
            <Avatar url={avatarUrl || "https://via.placeholder.com/40"} style={style} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
