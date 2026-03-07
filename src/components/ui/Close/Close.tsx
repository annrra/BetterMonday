import Link from 'next/link';
import styles from './c.module.css';
import classNames from 'classnames';

type CloseProps = {
  href?: string;
  text?: string;
  customClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Close = ({
  href = "/",
  text = "Close",
  customClassName,
  onClick
}: CloseProps) => {

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

