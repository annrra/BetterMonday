// components/ComingSoonTooltip.tsx
import React, { ReactNode, useState } from "react";
import styles from "./cst.module.css";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  message?: string;
  disabled?: boolean;
}

const ComingSoonTooltip: React.FC<Props> = ({
  children,
  message = "Coming soon...",
  disabled = true,
}) => {
  const [show, setShow] = useState(false);

  if (!disabled) return <>{children}</>;

  return (
    <div
      className={styles.layer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div className={classNames(styles.tooltip, { [styles.show]: show })}>{message}</div>
    </div>
  );
};

export default ComingSoonTooltip;
