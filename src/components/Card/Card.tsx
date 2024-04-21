import cn from 'classnames';
import * as React from 'react';
import ClockIcon from 'components/icons/ClockIcon/ClockIcon';
import TextV2 from '../TextV2/TextV2';
import styles from './Card.module.scss';

export type CardProps = {
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
	/** Клик на карточку */
	onClick?: React.MouseEventHandler;
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
	onClick,
	actionSlot,
}) => {
	return (
		<div
			className={cn(styles.card, className)}
			onClick={onClick}
		>
			<div className={styles.card__header}>
				<img
					className={styles['card__header-src']}
					src={image}
					alt='card'
				/>
			</div>
			<div className={styles.card__body}>
				{captionSlot && (
					<TextV2
						className={styles.card__caption}
						view='p-14'
						weight='medium'
						color='secondary'
					>
						<ClockIcon className={styles.card__icon} />
						{captionSlot}
					</TextV2>
				)}
				<TextV2
					maxLines={2}
					tag='h4'
					view='p-20'
					weight='medium'
					color='primary'
				>
					{title}
				</TextV2>
				<TextV2
					maxLines={3}
					className={styles.card__subtitle}
					view='p-16'
					color='secondary'
				>
					{subtitle}
				</TextV2>
				<div className={styles.card__footer}>
					{contentSlot && (
						<TextV2
							view='p-18'
							weight='bold'
							className={styles.card__content}
						>
							{contentSlot}
						</TextV2>
					)}
					<div className={styles.card__action}>{actionSlot}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
