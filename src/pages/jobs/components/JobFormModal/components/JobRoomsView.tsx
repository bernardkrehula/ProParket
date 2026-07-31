import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "#/utils/format";
import { getTotalPrice } from "#/utils/getTotalPrice";
import { getRoomsTotal, type JobRoomFormItem } from "../jobRoomUtils";
import {
  jobRoomCardSx,
  jobRoomHeaderSx,
  jobRoomsTotalBarSx,
  jobRoomsTotalLabelSx,
  jobRoomsTotalValueSx,
  jobRoomViewMetaSx,
  jobRoomViewServiceSx,
  jobRoomViewTitleSx,
  jobRoomViewTotalSx,
  jobServiceViewRowSx,
} from "../jobFormModalConfig";

type JobRoomsViewProps = {
  rooms: JobRoomFormItem[];
};

/** Read-only counterpart of JobItemsFields, shown in view mode. */
const JobRoomsView = ({ rooms }: JobRoomsViewProps) => {
  if (rooms.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nema stavki usluge.
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {rooms.map((room, index) => (
        <Box key={room.id} sx={jobRoomCardSx}>
          <Stack direction="row" sx={jobRoomHeaderSx}>
            <Typography sx={jobRoomViewTitleSx}>
              {room.room || `Prostorija ${index + 1}`}
            </Typography>
            <Typography sx={jobRoomViewTotalSx}>
              {formatCurrency(
                getTotalPrice(room.square_meters, room.price_per_m2),
              )}
            </Typography>
          </Stack>
          <Box sx={jobServiceViewRowSx}>
            <Typography sx={jobRoomViewServiceSx}>
              {room.services.length > 0 ? room.services.join(", ") : "-"}
            </Typography>
            <Typography sx={jobRoomViewMetaSx}>
              {room.square_meters || 0} m² · {room.price_per_m2 || 0} €/m²
              {room.material_cost
                ? ` · materijal ${room.material_cost} €`
                : ""}
            </Typography>
          </Box>
        </Box>
      ))}

      <Stack direction="row" sx={jobRoomsTotalBarSx}>
        <Typography sx={jobRoomsTotalLabelSx}>Ukupna cijena posla</Typography>
        <Typography sx={jobRoomsTotalValueSx}>
          {formatCurrency(getRoomsTotal(rooms))}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default JobRoomsView;
