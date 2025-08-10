import styles from './Add.module.css';
import Button from '@mui/material/Button';

const Add = ({onClick}) => {
	return (
		<Button className={styles.Add} 
			variant='contained' 
			color='primary' 
			onClick={() => setTimeout(onClick, 200)}
		>
			ADD
		</Button>
	);
}

export default Add;
