import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const _onMouseMove = (
		event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
	) => {
		const { currentTarget, pageX: screenX, pageY: screenY } = event;
		const header = currentTarget.querySelectorAll('h1');
		const paragraph = currentTarget.querySelector('p');
		if (header && paragraph) {
			const rotateYValue = 30 * Math.tanh(0.0008 * (screenX - getWidth() / 2));
			const rotateY = `rotateY(${rotateYValue}deg)`;
			const rotateXValue = 30 * Math.tanh(0.0008 * (screenY - getHeight() / 2));
			const rotateX = `rotateX(${-rotateXValue}deg)`;
			const transformStyle = `${rotateY} ${rotateX}`;
			header.forEach((item) => {
				item.style.setProperty('transform', transformStyle);
			});
			paragraph.style.setProperty('transform', rotateY);
		}
	};

	function getWidth() {
		return Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth,
		);
	}

	function getHeight() {
		return Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.documentElement.clientHeight,
		);
	}

	return (
		<div
			className={`${styles.not_found}`}
			onMouseMove={_onMouseMove}
		>
			<div className={`${styles.not_found_container}`}>
				<h1 className={`${styles.not_found_container__404}`}>404</h1>
				<h1 className={`${styles.not_found_container__title}`}>
					Page not found
				</h1>
				<p className={`${styles.not_found_container__text}`}>
					We don't have such page.{' '}
					<a
						onClick={() => navigate('/')}
						className={`${styles.not_found_container__link}`}
					>
						Come back now
					</a>
				</p>
			</div>
		</div>
	);
};

export default NotFound;
