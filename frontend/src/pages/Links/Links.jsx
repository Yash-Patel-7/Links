import styles from './Links.module.css';
import { getState } from '@readytogo/state';
import AddPage from '../Add/Add.jsx';
import Fab from '../../components/Fab/Fab.jsx';
import List from '../../components/List/List.jsx';

const Links = () => {
	const page = getState('page', undefined);

	const handleFabClick = () => {
		page.update(<AddPage />);
	}

	return (
		<div>
			<div className={styles.Fab}>
				<Fab onClick={handleFabClick} />
			</div>
			<div className={styles.Links}>
				<List />
			</div>
		</div>
	);
}
	
export default Links;
