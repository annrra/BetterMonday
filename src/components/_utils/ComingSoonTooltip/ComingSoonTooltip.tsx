// components/ComingSoonTooltip.tsx
import React, { ReactNode, useState } from "react";
import styles from "./cst.module.css";
import classNames from "classnames";

type ComingSoonTooltipProps = {
  children: ReactNode;
  message?: string;
  disabled?: boolean;
  position?: 'top' | 'bottom';
}

const ComingSoonTooltip = ({
  children,
  message = "Coming soon...",
  disabled = true,
  position = 'top',
}: ComingSoonTooltipProps) => {
  const [show, setShow] = useState(false);

  if (!disabled) return <>{children}</>;

  return (
    <div
      className={styles.layer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div className={classNames(styles.tooltip, { [styles.show]: show }, position === 'top' ? styles.top : styles.bottom)}>{message}</div>
    </div>
  );
};

export default ComingSoonTooltip;
