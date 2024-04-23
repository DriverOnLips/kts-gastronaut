import * as React from 'react';

import readyInMinutesSvg from 'assets/svg/readyInMinutes.svg';
import Text from 'components/Text/Text';
import styles from './Card.module.scss';

type CardProps = {
	/** Дополнительный classname */
	className?: string;
	/** URL изображения */
	image: string;
	/** Слот над заголовком */
	captionSlot?: React.ReactNode;
	/** Заголовок карточки */
	title: React.ReactNode;
	/** Описание карточки */
	subtitle: React.ReactNode;
	/** Содержимое карточки (футер/боковая часть), может быть пустым */
	contentSlot?: React.ReactNode;
	/** Клик на кнопку */
	onButtonClick?: React.MouseEventHandler;
	/** Клик на карточку */
	onItemClick?: React.MouseEventHandler;
	/** Слот для действия */
	actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
	className,
	image,
	captionSlot,
	title,
	subtitle,
	contentSlot,
	onButtonClick,
	onItemClick,
	actionSlot,
}) => {
	return (
		<div className={`${styles.recipe_item} ${className ? className : ''}`}>
			<div
				className={styles.recipe_item__content}
				onClick={onItemClick}
			>
				<img
					className={styles.recipe_item__img}
					src={image}
					alt='recipe_item'
				/>
				<div className={styles.recipe_item__info}>
					<div className={styles.recipe_item__info__ready_div}>
						{captionSlot && (
							<Text
								className={`${styles.recipe_item__info__ready_text}`}
								size='s5'
								text_align='start'
								weight='medium'
								color='secondary'
							>
								<img
									src={readyInMinutesSvg}
									className={styles.recipe_item__info__ready_svg}
								/>
								{captionSlot}
							</Text>
						)}
					</div>

					<Text
						className={`${styles.recipe_item__info__name} my-4`}
						size='s4'
						text_align='start'
						weight='bold'
						color='primary'
						maxLines={2}
					>
						{title}
					</Text>

					<Text
						className={`${styles.recipe_item__info__ingredients}`}
						size='s5'
						text_align='start'
						weight='medium'
						color='secondary'
						maxLines={3}
					>
						{subtitle}
					</Text>
					{contentSlot && (
						<Text
							className={`${styles.recipe_item__info__calories} mb-1 ml-3`}
							size='s5'
							text_align='start'
							weight='bold'
							color='main'
						>
							{contentSlot}
						</Text>
					)}
					<div
						className={`${styles.recipe_item__info__btn} mb-3 mr-3`}
						onClick={(event) => {
							event.stopPropagation();
							onButtonClick;
						}}
					>
						{actionSlot}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
