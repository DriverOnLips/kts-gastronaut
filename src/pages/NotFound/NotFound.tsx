import * as React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const _onMove = (
		event:
			| React.MouseEvent<HTMLHeadingElement, MouseEvent>
			| React.TouchEvent<HTMLDivElement>,
	) => {
		let screenX, screenY;
		if ('touches' in event) {
			// Это сенсорное событие
			screenX = event.touches[0].clientX;
			screenY = event.touches[0].clientY;
		} else {
			// Это событие мыши
			screenX = event.pageX;
			screenY = event.pageY;
		}

		const { currentTarget } = event;
		const header = currentTarget.querySelectorAll('h1');
		const paragraph = currentTarget.querySelector('p');
		if (header && paragraph) {
			const rotateYValue = 50 * Math.tanh(0.0008 * (screenX - getWidth() / 2));
			const rotateY = `rotateY(${rotateYValue}deg)`;
			const rotateXValue = 50 * Math.tanh(0.0008 * (screenY - getHeight() / 2));
			const rotateX = `rotateX(${-rotateXValue}deg)`;
			const transformStyle = `${rotateY} ${rotateX}`;
			header.forEach((item) => {
				item.style.setProperty('transform', transformStyle);
			});
			paragraph.style.setProperty('transform', transformStyle);
		}
	};

	const getWidth = () => {
		return Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth,
		);
	};

	const getHeight = () => {
		return Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.documentElement.clientHeight,
		);
	};

	return (
		<div
			className={`${styles.not_found}`}
			onMouseMove={_onMove}
			onTouchMove={_onMove}
		>
			<div className={`${styles.not_found_container}`}>
				<h1 className={`${styles.not_found_container__404}`}>404</h1>
				<h1 className={`${styles.not_found_container__title}`}>
					Page not found
				</h1>
				<p className={`${styles.not_found_container__text}`}>
					{`We don't have such page. `}
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

export default memo(NotFound);
