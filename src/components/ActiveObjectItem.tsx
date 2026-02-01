import type { MapObject } from '@/interfaces';
import { Navigation as NavigationIcon } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';

type Props = {
  obj: MapObject;
};

const ActiveObjectItem = ({ obj }: Props) => {
  return (
    <ListItem
      key={obj.id}
      sx={{
        bgcolor: 'success.50',
        mb: 0.5,
        borderRadius: 1,
        border: 1,
        borderColor: 'success.200',
      }}
    >
      <NavigationIcon
        sx={{
          mr: 1,
          fontSize: 20,
          transform: `rotate(${obj.direction}deg)`,
          color: 'success.main',
        }}
      />
      <ListItemText primary={obj.id} secondary={`${obj.lat.toFixed(4)}, ${obj.lng.toFixed(4)}`} />
    </ListItem>
  );
};

export default ActiveObjectItem;
