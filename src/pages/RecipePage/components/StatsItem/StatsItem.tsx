import * as React from 'react';
import Text from 'components/Text/Text';

type StatsItemProps = {
	className: string;
	title: string;
	value: number;
	caption: string;
};

const StatsItem: React.FC<StatsItemProps> = ({
	className,
	title,
	value,
	caption,
}) => {
	return (
		<div className={className}>
			<Text
				size='s5'
				text_align='center'
				weight='medium'
				color='primary'
			>
				{title}
			</Text>
			<Text
				size='s5'
				text_align='center'
				weight='bold'
				color='main'
			>
				{value} {caption}
			</Text>
		</div>
	);
};

export default StatsItem;
