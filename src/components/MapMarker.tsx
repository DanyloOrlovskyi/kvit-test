import type { MapObject } from '@/interfaces';
import { GpsOff as GpsOffIcon, Navigation as NavigationIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import L from 'leaflet';
import { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

type Props = {
  mapObject: MapObject;
};

const MapMarker = ({ mapObject }: Props) => {
  const theme = useTheme();
  const icon = useMemo(() => {
    const isActive = mapObject.status === 'active';

    const iconMarkup = isActive
      ? renderToStaticMarkup(<NavigationIcon />)
      : renderToStaticMarkup(<GpsOffIcon />);

    const iconColor = isActive ? theme.status.success : theme.status.danger;

    return L.divIcon({
      className: 'custom-mui-marker',
      html: `
                <div style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  color: ${iconColor};
                  transform: ${isActive ? `rotate(${mapObject.direction ?? 0}deg)` : 'none'};
                ">
                  ${iconMarkup}
                </div>
              `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }, [mapObject.status, mapObject.direction, theme]);

  return (
    <Marker position={[mapObject.lat, mapObject.lng]} icon={icon}>
      <Popup>
        <div className="min-w-[180px] space-y-2 p-2">
          <div className="text-sm font-medium">ID: {mapObject.id}</div>
          <div className="text-xs text-muted-foreground">
            {mapObject.lat.toFixed(5)}, {mapObject.lng.toFixed(5)}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
