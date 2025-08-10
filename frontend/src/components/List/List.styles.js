import { styled } from '@mui/system';
import { 
	ListItemButton as MuiListItemButton,
	IconButton as MuiIconButton,
	Skeleton as MuiSkeleton,
} from '@mui/material';
import { Check as MuiCheck } from '@mui/icons-material';

const ListItemButton = styled(MuiListItemButton)({});
ListItemButton.defaultProps = {
	component: 'a',
};

const IconButton = styled(MuiIconButton)({
	'&:hover': {
		color: 'lightgreen',
	},
});

const Check = styled(MuiCheck)({
	color: 'lightgreen',
	fontSize: '2em',
});

const Skeleton = styled(MuiSkeleton)({
	backgroundColor: 'rgba(255, 255, 255, 0.13)',
	fontSize: '3em',
	width: '3em',
});
Skeleton.defaultProps = {
	variant: 'text',
};

export {
	ListItemButton,
	IconButton,
	Check,
	Skeleton,
};

