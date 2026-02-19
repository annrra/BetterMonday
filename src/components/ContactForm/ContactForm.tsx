"use client";
import React, { useState, ChangeEvent, SubmitEvent } from 'react';
import styles from './cf.module.css';
import classNames from 'classnames';

type FormData = {
  name: string;
  email: string;
  message: string;
  webSite: string;
  company: string;
  botField: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
  webSite: '',
  company: '',
  botField: 'no',
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const webSiteValue = formData.get('webSite') as string;
    const companyValue = formData.get('company') as string;
    const botFieldValue = formData.get('botField') as string;
    if (webSiteValue.trim() !== '' || companyValue.trim() !== '' || botFieldValue !== 'no') {
      alert('Security Alert: Form Submission Blocked');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'post',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: HTTP status ${response.status}`);
      }

      const responseData = await response.json();
      setIsError(false);
      setMessage(responseData.message);
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage('Error, please try resubmitting the form');
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <div className={styles['contact-form']}>
      <form onSubmit={handleSubmit} className={classNames({ loading: submitting })}>
        <div className={classNames(styles.message, {[styles.show]: message, [styles.error]: isError, [styles.success]: !isError})}>{message}</div>
        <div style={{ display: 'none' }}>
          <label htmlFor="webSite">Website</label>
          <input type="text" id="webSite" name="webSite" value={formData.webSite} onChange={handleChange} />
        </div>
        <div className={styles.row}>
          <input type="text" id="name" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.row}>
          <input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.nevidim}>
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
        </div>
        <div className={classNames(styles.row, styles['row-msg'])}>
          <textarea id="message" name="message" placeholder='Message' value={formData.message} onChange={handleChange} required />
        </div>
        <div className={styles.nevidim}>
          <label htmlFor="botField">Fill</label>
          <input type="text" id="botField" name="botField" value={formData.botField} onChange={handleChange} />
        </div>
        <div className={classNames(styles.row, styles['row-submit'])}>
          <button type="submit">
            <span>Commit</span>
            <div className={styles.ico}>
              <svg
                width={33}
                height={33}
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="accept">
                  <rect id="rect" width={33} height={33} rx={5} className={styles['accept-btn']} />
                  <path
                    id="arrow"
                    d="M22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929L16.3431 8.92893C15.9526 8.53841 15.3195 8.53841 14.9289 8.92893C14.5384 9.31946 14.5384 9.95262 14.9289 10.3431L20.5858 16L14.9289 21.6569C14.5384 22.0474 14.5384 22.6805 14.9289 23.0711C15.3195 23.4616 15.9526 23.4616 16.3431 23.0711L22.7071 16.7071ZM9 16V17H22V16V15H9V16Z"
                    className={styles.btnarrow}
                  />
                </g>
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );

};

export default ContactForm;
