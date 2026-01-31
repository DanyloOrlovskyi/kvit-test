import type { MapObject } from '@/interfaces';
import { GpsOff as GpsOffIcon, Navigation as NavigationIcon } from '@mui/icons-material';
import L from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Marker, Popup } from 'react-leaflet';

type Props = {
  mapObject: MapObject;
};

const MapMarker = ({ mapObject }: Props) => {
  const markerRef = useRef<L.Marker>(null);
  const [iconContainer, setIconContainer] = useState<HTMLDivElement | null>(null);

  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'custom-mui-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      }),
    []
  );

  useEffect(() => {
    if (!markerRef.current) return;

    const iconEl = markerRef.current.getElement();
    if (!iconEl) return;

    setIconContainer(iconEl as HTMLDivElement);
  }, []);

  const isActive = mapObject.status === 'active';

  const iconContent = isActive ? (
    <NavigationIcon
      sx={{
        fontSize: 24,
        color: 'success.main',
        transform: `rotate(${mapObject.direction ?? 0}deg)`,
        transition: 'transform 0.4s ease-out',
      }}
    />
  ) : (
    <GpsOffIcon
      sx={{
        fontSize: 24,
        color: 'error.main',
      }}
    />
  );

  return (
    <Marker ref={markerRef} position={[mapObject.lat, mapObject.lng]} icon={icon}>
      {iconContainer &&
        createPortal(
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {iconContent}
          </div>,
          iconContainer
        )}

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
