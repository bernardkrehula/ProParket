import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "#/utils/format";
import { getTotalPrice } from "#/utils/getTotalPrice";
import {
  getMaterialTotal,
  getRoomMaterialsTotal,
  getRoomsMaterialsTotal,
  getRoomsTotal,
  type JobRoomFormItem,
} from "#/pages/jobs/components/JobFormModal/utils/jobRoomUtils";
import {
  jobRoomCardSx,
  jobRoomHeaderSx,
  jobRoomsTotalBarSx,
  jobRoomsTotalLabelSx,
  jobRoomsTotalValueSx,
  jobRoomTotalLabelSx,
  jobRoomTotalRowSx,
  jobRoomTotalValueSx,
  jobRoomViewMetaSx,
  jobRoomViewServiceSx,
  jobRoomViewTitleSx,
  jobRoomViewTotalSx,
  jobServiceViewRowSx,
  jobMaterialsSectionSx,
  jobMaterialsHeaderSx,
  jobMaterialsTitleSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobRoomsViewProps = {
  rooms: JobRoomFormItem[];
};

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
            </Typography>
          </Box>

          {room.materials.length > 0 && (
            <Box sx={jobMaterialsSectionSx}>
              <Stack direction="row" sx={jobMaterialsHeaderSx}>
                <Typography sx={jobMaterialsTitleSx}>Materijal</Typography>
                <Typography sx={jobRoomTotalValueSx}>
                  {formatCurrency(getRoomMaterialsTotal(room.materials))}
                </Typography>
              </Stack>

              {room.materials.map((material) => (
                <Stack
                  key={material.id}
                  direction="row"
                  sx={jobRoomTotalRowSx}
                >
                  <Typography sx={jobRoomViewMetaSx}>
                    {material.name || "-"} · {material.quantity || 0} ×{" "}
                    {material.unit_price || 0} €
                  </Typography>
                  <Typography sx={jobRoomViewMetaSx}>
                    {formatCurrency(getMaterialTotal(material))}
                  </Typography>
                </Stack>
              ))}
            </Box>
          )}
        </Box>
      ))}

      <Stack direction="row" sx={jobRoomTotalRowSx}>
        <Typography sx={jobRoomTotalLabelSx}>Ukupno materijal</Typography>
        <Typography sx={jobRoomTotalValueSx}>
          {formatCurrency(getRoomsMaterialsTotal(rooms))}
        </Typography>
      </Stack>

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
