import { getState } from '@readytogo/state';

const getData = async () => {
	const res = await fetch('http://localhost:5000');
	if (res.status !== 200) throw new Error('Internal Server Error');
	const newData = await res.json();
	const data = getState('data', undefined);
	if (JSON.stringify(newData) === JSON.stringify(data.getValue())) return;
	data.update(newData);
}

const postData = async (newData) => {
	const res = await fetch('http://localhost:5000', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	});
	if (res.status !== 201) throw new Error('Internal Server Error');
	getState('data', undefined).update(newData);
}

export {
	getData,
	postData
}

