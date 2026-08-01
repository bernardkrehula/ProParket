import { Box } from "@mui/material";
import {
  AdvancedMarker,
  ColorScheme,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import {
  addressMapOverlaySx,
  addressMapPreviewSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID ?? "DEMO_MAP_ID";

type AddressMapPreviewProps = {
  position: google.maps.LatLngLiteral;
  label: string;
};

const AddressMapPreview = ({ position, label }: AddressMapPreviewProps) => {
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={addressMapPreviewSx}>
      <Map
        key={`${position.lat},${position.lng}`}
        mapId={MAP_ID}
        colorScheme={ColorScheme.DARK}
        defaultCenter={position}
        defaultZoom={16}
        gestureHandling="none"
        disableDefaultUI
        keyboardShortcuts={false}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        <AdvancedMarker position={position} title={label}>
          <Pin
            background="#3b5bdb"
            borderColor="#1b2a63"
            glyphColor="#dbe4ff"
            scale={1.1}
          />
        </AdvancedMarker>
      </Map>

      <Box
        component="button"
        type="button"
        onClick={openInGoogleMaps}
        aria-label={`Otvori adresu ${label} u Google Kartama`}
        sx={addressMapOverlaySx}
      />
    </Box>
  );
};

export default AddressMapPreview;
