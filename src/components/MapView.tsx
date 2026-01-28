import { Box, Typography } from "@mui/material";
import {
  GpsOff,
  Navigation as NavigationIcon,
  SatelliteAlt,
} from "@mui/icons-material";
import ReactDOMServer from "react-dom/server";
import { rootStore } from "../stores";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMapObjectUpdater } from "../hooks/useMapObjectUpdater.ts";

const MapView = () => {
  const DEFAULT_CENTER: [number, number] = [50.4501, 30.5234];

  const allObjects = Array.from(rootStore.objectTracker.objects.values());

  useMapObjectUpdater(rootStore);

  if (allObjects.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.100",
        }}
      >
        <Box sx={{ textAlign: "center", color: "text.secondary" }}>
          <SatelliteAlt sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
          <Typography>Немає об'єктів для відображення</Typography>
        </Box>
      </Box>
    );
  }

  const createIcon = (direction: number, status: string) => {
    let iconElement: any;

    if (status === "active") {
      iconElement = (
        <NavigationIcon
          sx={{
            mr: 1,
            fontSize: 20,
            transform: `rotate(${direction}deg)`,
            color: "success.main",
          }}
        />
      );
    } else {
      iconElement = (
        <GpsOff
          sx={{
            mr: 1,
            fontSize: 20,
            color: "error.main",
          }}
        />
      );
    }

    const htmlString = ReactDOMServer.renderToStaticMarkup(iconElement);

    return L.divIcon({
      className: "custom-mui-marker",
      html: htmlString,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        bgcolor: "primary.50",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allObjects.map((obj) => (
          <Marker
            key={obj.id}
            position={[obj.lat, obj.lng]}
            icon={createIcon(obj.direction, obj.status)}
          >
            <Popup>
              <div className="space-y-1">
                <div className="space-y-1">
                  <div className="text-sm font-medium">ID: {obj.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {obj.lat.toFixed(5)}, {obj.lng.toFixed(5)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;
