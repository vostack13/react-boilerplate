import React from 'react'
import styles from './style.css';

const Home = () => {
	return <div className={styles.wrapper}>
		<header>
			<h2>Header</h2>
		</header>

		<aside>
			<h2>Sidebar</h2>
		</aside>

		<main>
			<h2>Main</h2>
		</main>

		<footer>
			<h2>Footer</h2>
		</footer>
	</div>
}

export default Home
