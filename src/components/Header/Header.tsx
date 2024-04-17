import React from 'react';
import styles from './Header.module.scss';

const MyComponent = () => {
	return (
		<nav className={styles.navbar_desctop}>
			<a className={styles.navbar__logo}>Гастронавт</a>
			<ul className={styles.links}>
				<li className={styles.link}>Блюда</li>
			</ul>
		</nav>
	);
};

export default MyComponent;
