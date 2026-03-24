import Link from 'next/link';
import styles from './page.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';

export default function NotFound() {

	return (
		<div className={styles.notfound}>
			<Link href="/" className={styles.logo}>
				<MondayLogoSvg />
			</Link>
			<div className={styles.notice}>
				<h2>Page not found</h2>
				<div>Try again later, or go to <Link href="/">homepage</Link>.</div>
			</div>
		</div>
	)
}