import styles from './Cancel.module.css';
import Button from '@mui/material/Button';

const Cancel = ({onClick}) => {
	return (
		<Button className={styles.Cancel} 
			variant='outlined' 
			color='primary' 
			onClick={() => setTimeout(onClick, 200)}
		>
			CANCEL
		</Button>
	);
}

export default Cancel;
