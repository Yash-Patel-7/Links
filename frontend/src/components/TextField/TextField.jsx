import styles from './TextField.module.css';
import TextField from '@mui/material/TextField';
import { useState } from '@readytogo/state';

const Textfield = ({inputRef}) => {
	const textfield = useState('textfield', '');

	const placeholder = JSON.stringify({
		"Example": "https://example.com/",
	}, null, 4);

	const onChange = (e) => {
		textfield.update(e.target.value);
	}

	return (
		<TextField
			className={styles.TextField}
			inputRef={inputRef}
			multiline
			rows={15}
			placeholder={placeholder}
			defaultValue={textfield.getValue()}
			onChange={onChange}
			variant='standard'
			InputProps={{
				style: {
					fontSize: '1.5rem',
					color: 'white',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderRadius: '10px',
					padding: '10px',
				}
			}}
		/>
	);
}

export default Textfield;

