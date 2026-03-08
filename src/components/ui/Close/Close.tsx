import Link from 'next/link';
import { TransitionLink } from '@/src/components/transitions';
import styles from './c.module.css';
import classNames from 'classnames';

type CloseProps = {
  href?: string;
  text?: string;
  customClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  transition?: boolean;
}

const Close = ({
  href = "/",
  text = "Close",
  customClassName,
  onClick,
  transition = false,
}: CloseProps) => {

  if (transition) {
    return (
      <TransitionLink href={href} className={classNames(styles.x, customClassName)} onClick={onClick}>
        {text}
      </TransitionLink>
    );
  }

  return (
    <Link 
      href={href} 
      className={classNames(styles.x, customClassName)}
      onClick={onClick}
    >
      {text}
    </Link>
  );

};

export default Close;

