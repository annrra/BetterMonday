import styles from './f.module.css';
import { getFooter } from '../../../lib/api';

const Footer = async () => {
  const footer = await getFooter();
  const footContent = footer.post.content;

  return (
    <section className={styles.footer}>
      <div>
        <div className={styles.footContent}
          dangerouslySetInnerHTML={{
            __html: footContent,
          }}
        />
      </div>
    </section>
  );

};

export default Footer;
