"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ContactForm } from '../ContactForm';
import styles from './co.module.css';

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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15, // wait for panel
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const ConnectOverlay: React.FC = () => {

  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.77, 0, 0.175, 1],
      }}
    >
      <Link href="/" className={styles.x}>
        Close
      </Link>
      <motion.div 
        className={styles.contact}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className={styles.heading}
          variants={itemVariants}
        >
          <h2>every conversation<br />starts somewhere</h2>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
        <motion.div 
          className={styles.noform}
          variants={itemVariants}
        >
          Not a fan of forms? Say hello by <EmailLink className={styles.email} /> instead.
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ConnectOverlay;
