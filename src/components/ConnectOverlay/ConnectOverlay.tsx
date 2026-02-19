"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ContactForm } from '../ContactForm';
import styles from './co.module.css';

type ContactFormProps = {
  onClose: () => void;
}

const ConnectOverlay: React.FC<ContactFormProps> = ({ onClose }) => {

  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{
        duration: 0.4,
        ease: [0.77, 0, 0.175, 1],
      }}
    >
      <Link 
        href="/"
        className={styles.x}
        onClick={onClose}
      >
        Close
      </Link>
      <div className={styles.contact}>
        <div className={styles.heading}>
          <h2>every conversation starts somewhere</h2>
        </div>
        <ContactForm />
        <div className={styles.noform}>Not a fan of forms? Say hello by <Link href="/" className={styles.email}>email</Link> instead.</div>
      </div>
    </motion.div>
  )
}

export default ConnectOverlay;
