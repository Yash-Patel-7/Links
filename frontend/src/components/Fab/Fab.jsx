import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton = ({onClick}) => {
	return (
		<div>
			<Fab color="primary" aria-label="add" size="large" onClick={
				() => setTimeout(onClick, 200)
			}>
				<AddIcon />
			</Fab>
		</div>
	);
};

export default FloatingActionButton;
