import styles from './Error.module.css';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg.jsx';

const Error = ({nextPage, children}) => {
	return (
		<div className={styles.Error}>
			<ErrorMsg nextPage={nextPage}>
				{children}
			</ErrorMsg>
		</div>
	);
}

export default Error;
