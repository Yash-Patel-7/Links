import Stack from '@mui/material/Stack';
import { useRef } from 'react';
import { getState } from '@readytogo/state';
import { postData } from '../../api.js';
import LinksPage from '../../pages/Links/Links.jsx';
import TextField from '../TextField/TextField.jsx';
import AddButton from '../Add/Add.jsx';
import CancelButton from '../Cancel/Cancel.jsx';

const AddStack = () => {
	const inputRef = useRef();
	const page = getState('page', undefined);

	const handleAddClick = () => {
		try {
			const newData = JSON.parse(inputRef.current.value);
			const data = getState('data', undefined);
			if (data.getValue() === undefined) {
				throw new Error('Data is not loaded');
			}
			const dataC = JSON.parse(JSON.stringify(data.getValue()));
			let added = false;
			Object.entries(newData).forEach(([name, link]) => {
				const existsUn = dataC.unchecked[name] !== undefined;
				const existsCh = dataC.checked[name] !== undefined;
				if (existsUn === false && existsCh === false) {
					dataC.unchecked[name] = link;
					added = true;
				}
			});
			if (added === true) {
				postData(dataC).then(() => {
					page.update(<LinksPage />);
				}).catch((error) => alert(error.message));
			} else {
				page.update(<LinksPage />);
			}
		} catch (error) {
			alert(error.message);
		}
	}

	const handleCancelClick = () => {
		page.update(<LinksPage />);
	}

	return (
		<Stack spacing={5} alignItems="center">
			<TextField inputRef={inputRef} />
			<AddButton onClick={handleAddClick} />
			<CancelButton onClick={handleCancelClick} />
		</Stack>
	);
}

export default AddStack;
