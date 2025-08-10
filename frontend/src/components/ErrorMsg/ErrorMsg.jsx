import styles from './ErrorMsg.module.css';
import { getState } from '@readytogo/state';
import Anchor from '../Anchor/Anchor.jsx';
import Typography from '@mui/material/Typography';

const ErrorMsg = ({nextPage, children}) => {
	const page = getState('page', undefined);

	const onClick = () => {
		page.update(nextPage);
	}

	return (
		<div className={styles.ErrorMsg}>
			<Anchor onClick={onClick}>
				<Typography variant="h1">
					<u>{children}</u>
				</Typography>
			</Anchor>
		</div>
	);
}

export default ErrorMsg;
