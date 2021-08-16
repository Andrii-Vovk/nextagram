import classNames from "classnames";

import styles from "./Spinner.module.scss";

interface SpinnerProps {
    small?: boolean;
    error?: boolean;
}
 
const Spinner: React.FC<SpinnerProps> = ({small, error}) => {
    return ( <div className={styles.wrapper}>
        {!error && <div className={classNames([styles.loader, {[styles.small]: small}])} />}
        {error && <i className={classNames(['fas', 'fa-times'])} />}
    </div> );
}
 
export default Spinner;