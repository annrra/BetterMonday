// components/ComingSoonTooltip.tsx
import React from "react";

type EmailLinkProps = {
  className?: string
}

const EmailLink: React.FC<EmailLinkProps> = ({ className }) => {
  const handleClick = () => {
    const a = "ann"
    const b = "rra"
    const c = "gma"
    const d = "il"
    const e = "co"
    const f = "m"
    window.location.href = `mailto:${a + b}@${c + d}.${e + f}`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      handleClick()
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
    >
      email
    </span>
  )
}

export default EmailLink;
