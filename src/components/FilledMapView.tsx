import { useMapObjectUpdater } from '@/hooks/useMapObjectUpdater.ts';
import type { MapObject } from '@/interfaces';
import { rootStore } from '@/stores';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

type Position = [number, number];

const FilledMapView = observer(() => {
  const DEFAULT_CENTER: Position = [50.4501, 30.5234];
  const DEFAULT_ZOOM: number = 8;

  useMapObjectUpdater(rootStore);

  const allObjects: MapObject[] = [...rootStore.objectTracker.objects.values()];

  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        bgcolor: 'primary.50',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allObjects.map((obj: MapObject) => (
          <MapMarker key={obj.id} mapObject={obj} />
        ))}
      </MapContainer>
    </Box>
  );
});

export default FilledMapView;
