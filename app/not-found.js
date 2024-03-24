import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {

	return (
		<div className={styles.reactive}>
			<div className={styles.notfound}>
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet">
					<g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)">
					<path className={styles.fav} d="M123 300 c-72 -16 -116 -66 -116 -131 0 -78 44 -119 127 -119 90 0
					138 86 85 154 -43 55 -150 17 -134 -47 4 -15 13 -31 20 -37 20 -16 59 -8 63
					13 3 15 -1 17 -23 11 -23 -6 -26 -4 -23 12 2 13 12 19 32 19 40 0 52 -34 24
					-70 -17 -22 -25 -25 -52 -19 -42 9 -64 30 -72 70 -8 46 15 80 66 95 141 43
					223 -135 97 -211 -18 -11 -25 -20 -17 -20 26 0 78 38 94 68 28 55 25 110 -10
					152 -43 51 -103 73 -161 60z"/>
					</g>
				</svg>
				<h2>Page not found</h2>
				<div>Currently BetterMonday is under active development.<br />Try again later, or go to <Link href="/">homepage</Link>.</div>
			</div>
		</div>
	)
}