"use client";
import React from 'react';
import Link from 'next/link';
import { ContactForm } from '../ContactForm';
import styles from './co.module.css';
import classNames from 'classnames';

type ContactFormProps = {
  onClose: () => void;
}

const ConnectOverlay: React.FC<ContactFormProps> = ({ onClose }) => {

  return (
    <div className={styles.overlay}>
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
    </div>
  )
}

export default ConnectOverlay;
