import { MapMarker } from '@/components';
import { useMapObjectUpdater } from '@/hooks/useMapObjectUpdater.ts';
import type { MapObject } from '@/interfaces';
import { rootStore } from '@/stores';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MapContainer, TileLayer } from 'react-leaflet';

import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/constants';

const MapPage = observer(() => {
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

export default MapPage;
