import classNames from "classnames";
import { useState } from "react";

import styles from "./DropDown.module.scss";

export interface DropDownType {
  index: number;
  text: string;
  onClick: () => void;
}

export interface DropDownProps {
  dropdown: DropDownType[];
}

const DropDown: React.FC<DropDownProps> = ({ dropdown }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={classNames([styles.container, { [styles.show]: show }])}>
        <button
          className={styles.dropBtn}
          type="button"
          onClick={() => setShow(!show)}
        >
          <i className="fas fa-ellipsis-v" />
        </button>
        <div className={styles.content}>
          {dropdown.map((item) => (
            <button key={item.index} type="button" onClick={item.onClick}>
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropDown;
