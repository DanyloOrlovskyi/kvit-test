import useCurrentTime from '@/hooks/useCurrentTime';
import type { MapObject } from '@/interfaces';
import { GpsOff } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';

type Props = {
  obj: MapObject;
};

const LostObjectItem = ({ obj }: Props) => {
  const now = useCurrentTime();
  const secondsAgo = Math.max(0, Math.floor((now - obj.lastUpdate) / 1000));
  return (
    <ListItem
      sx={{
        bgcolor: 'error.50',
        mb: 0.5,
        borderRadius: 1,
        border: 1,
        borderColor: 'error.200',
      }}
    >
      <GpsOff sx={{ mr: 1, fontSize: 20, color: 'error.main' }} />
      <ListItemText primary={obj.id} secondary={`Втрачено ${secondsAgo}с тому`} />
    </ListItem>
  );
};

export default LostObjectItem;
