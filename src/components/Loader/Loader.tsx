/* eslint-disable react/react-in-jsx-scope */
import styles from './Loader.module.scss';

const Loader = () => {
	return (
		<div className={`${styles.loader_container}`}>
			<div className={`${styles.loader_item}`} />
		</div>
	);
};

export default Loader;
