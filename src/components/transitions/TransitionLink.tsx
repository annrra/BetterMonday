'use client';

interface CurtainLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const TransitionLink = ({ href, children, onClick, ...props }: CurtainLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // run external onClick first (if provided)
    onClick?.(e);

    // if external handler prevented default, stop
    if (e.defaultPrevented) return;

    // Let the browser handle modified clicks (new tab, etc.)
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }

    e.preventDefault();

    const event = new CustomEvent('start-curtain', { detail: href });
    window.dispatchEvent(event);
  };  

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;