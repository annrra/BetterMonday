import styles from './post.module.css';
import { SideNavBar } from '../../src/components/SideNavBar';
import Entry from './Entry';
import Body from './Body';
import { Footer } from '../../src/components/Footer';

export default async function Post({ params: {slug} }) {

  return (
		<div className={styles.post}>
			<SideNavBar />
			<Entry slug={slug} />
			<Body slug={slug} />
			<Footer />
		</div>
  )
}
