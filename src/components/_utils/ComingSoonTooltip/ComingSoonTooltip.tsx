// components/ComingSoonTooltip.tsx
import React, { ReactNode, useState } from "react";
import styles from "./cst.module.css";
import classNames from "classnames";

type ComingSoonTooltipProps = {
  children: ReactNode;
  message?: string;
  disabled?: boolean;
}

const ComingSoonTooltip = ({
  children,
  message = "Coming soon...",
  disabled = true,
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
      <div className={classNames(styles.tooltip, { [styles.show]: show })}>{message}</div>
    </div>
  );
};

export default ComingSoonTooltip;
