import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useServices } from "#/hooks/useServices";
import { formatCurrency } from "#/utils/format";
import JobRoomFields from "./JobRoomFields";
import {
  createEmptyRoom,
  getRoomsTotal,
  type JobItemsFieldsHandle,
  type JobRoomFormItem,
} from "#/pages/jobs/components/JobFormModal/utils/jobRoomUtils";
import {
  jobRoomAddButtonSx,
  jobRoomsTotalBarSx,
  jobRoomsTotalLabelSx,
  jobRoomsTotalValueSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobItemsFieldsProps = {
  defaults: JobRoomFormItem[];
};

const JobItemsFields = forwardRef<JobItemsFieldsHandle, JobItemsFieldsProps>(
  ({ defaults }, ref) => {
    const [rooms, setRooms] = useState<JobRoomFormItem[]>(
      defaults.length > 0 ? defaults : [createEmptyRoom()],
    );

    const { serviceNames, servicePriceByName } = useServices();

    useImperativeHandle(ref, () => ({ getValues: () => rooms }));

    const updateRoom = (id: string, patch: Partial<JobRoomFormItem>) => {
      setRooms((prev) =>
        prev.map((room) => (room.id === id ? { ...room, ...patch } : room)),
      );
    };

    const addRoom = () => setRooms((prev) => [...prev, createEmptyRoom()]);

    const removeRoom = (id: string) =>
      setRooms((prev) =>
        prev.length > 1 ? prev.filter((room) => room.id !== id) : prev,
      );

    const handleServicesChange = (id: string, selectedNames: string[]) => {
      const total = selectedNames.reduce(
        (sum, name) => sum + (servicePriceByName.get(name) ?? 0),
        0,
      );
      updateRoom(id, {
        services: selectedNames,
        price_per_m2: total > 0 ? String(total) : "",
      });
    };

    return (
      <Stack spacing={2}>
        {rooms.map((room, index) => (
          <JobRoomFields
            key={room.id}
            room={room}
            index={index}
            serviceNames={serviceNames}
            canRemove={rooms.length > 1}
            onChange={(patch) => updateRoom(room.id, patch)}
            onServicesChange={(services) =>
              handleServicesChange(room.id, services)
            }
            onRemove={() => removeRoom(room.id)}
          />
        ))}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addRoom}
          sx={jobRoomAddButtonSx}
        >
          Dodaj prostoriju
        </Button>

        <Stack direction="row" sx={jobRoomsTotalBarSx}>
          <Typography sx={jobRoomsTotalLabelSx}>Ukupna cijena posla</Typography>
          <Typography sx={jobRoomsTotalValueSx}>
            {formatCurrency(getRoomsTotal(rooms))}
          </Typography>
        </Stack>
      </Stack>
    );
  },
);

JobItemsFields.displayName = "JobItemsFields";

export default JobItemsFields;
