import { newServer } from '@readytogo/server';
import { getFile } from '@readytogo/file';

const file = getFile('./data/data.json');
file.create();
if (await file.read() === '')
file.write(await getFile('./data/default.json').read());

const { app } = newServer(5000, {inactive: {enable: false}});

app.get('/', async (_req, res) => {
	try {
		res.status(200).json(JSON.parse(await file.read()));
	} catch (error) {
		res.status(500).end();
	}
});

app.post('/', async (req, res) => {
	try {
		if (typeof req.body !== 'object' || req.body === null) throw new Error();
		await file.write(JSON.stringify(req.body, null, 4));
		res.status(201).end();
	} catch (error) {
		res.status(500).end();
	}
});

