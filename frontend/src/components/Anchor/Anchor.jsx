import styles from './Anchor.module.css';

const Anchor = ({ onClick, children }) => {
	return (
		<div>
			<button className={styles.Anchor} onClick={onClick}>
				{children}
			</button>
		</div>
	);
}

export default Anchor;

