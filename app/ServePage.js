import styles from './page.module.css';
import { Header } from '../src/components/Header';
import { SideNavBar } from '../src/components/SideNavBar';
import { AccentBlock } from '../src/components/AccentBlock';
import { CasesHeader } from '../src/components/CasesHeader';
import { PostPhotocomma } from '../src/components/Cases';
import { PostSkandan } from '../src/components/Cases';
import { Footer } from '../src/components/Footer';

const ServePage = async () => {

  return (
    <div id='reactive' className={styles.reactive}>
      <Header mode='light' />
      <SideNavBar />
      <div id='prlx' className={styles.core}>
        <AccentBlock />
        <div className={styles.lax} data-depth='3.90'>
          <CasesHeader />
          <div id='cases'>
            <section className={styles.case}>
              <PostPhotocomma />
              <div className="divider"></div>
              <PostSkandan />
              <div className={styles.keepcalm}>coming up more ...</div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ServePage;
