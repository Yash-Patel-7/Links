import styles from './List.module.css';
import { 
	ListItemButton,
	IconButton,
	Check,
	Skeleton,
} from './List.styles.js';
import { useState } from '@readytogo/state';
import { executeOnce } from '@readytogo/global';
import { getData, postData } from '../../api.js';

const List = () => {
	const data = useState('data', undefined);
	executeOnce('getDataOnLoad', () => {
		getData().catch((error) => alert(error.message));
	});

	if (data.getValue() === undefined) {
		return (
			<div className={styles.List}>
				<Skeleton />
			</div>
		);
	}

	const handleCheckClick = async (name) => {
		try {
			const newData = JSON.parse(JSON.stringify(data.getValue()));
			newData.checked[name] = newData.unchecked[name];
			delete newData.unchecked[name];
			await postData(newData);
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<div className={styles.List}>
			<ol>
				{Object.entries(data.getValue().unchecked).map(([name, link]) => (
					<li key={name}>
						<div className={styles.ListItem}>
							<ListItemButton 
							href={link}
							onClick={(e) => {
								e.preventDefault();
								setTimeout(() => {
									window.open(e.target.href, '_blank');
								}, 200);
							}}
							>
								{name}
							</ListItemButton>
							<IconButton 
							className={styles.IconButton}
							onClick={() => {
								setTimeout(() => {
									handleCheckClick(name);
								}, 200);
							}}
							>
								<Check />
							</IconButton>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
};

export default List;
