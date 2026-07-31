import { Box, Button, DialogActions, Stack } from "@mui/material";
import {
  jobFormModalActionsSx,
  jobFormModalCancelButtonSx,
} from "../jobFormModalConfig";

type JobFormModalActionsProps = {
  isViewMode: boolean;
  isNewJob: boolean;
  isSubmitting?: boolean;
  /** A saved job with a finish date is offered "Vrati u tijek" instead. */
  isFinished: boolean;
  canDelete: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onMarkFinished: () => void;
  onReturnToProgress: () => void;
  onCancelEdit: () => void;
  onSubmit: () => void;
};

const JobFormModalActions = ({
  isViewMode,
  isNewJob,
  isSubmitting,
  isFinished,
  canDelete,
  onClose,
  onDelete,
  onEdit,
  onMarkFinished,
  onReturnToProgress,
  onCancelEdit,
  onSubmit,
}: JobFormModalActionsProps) => (
  <DialogActions sx={jobFormModalActionsSx}>
    <Box>
      {canDelete && (
        <Button onClick={onDelete} color="error">
          Obriši
        </Button>
      )}
    </Box>

    <Stack direction="row" spacing={1}>
      {isViewMode ? (
        <>
          <Button onClick={onClose} sx={jobFormModalCancelButtonSx}>
            Zatvori
          </Button>
          {!isNewJob &&
            (isFinished ? (
              <Button
                variant="outlined"
                color="warning"
                onClick={onReturnToProgress}
                disabled={isSubmitting}
              >
                Vrati u tijek
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={onMarkFinished}
                disabled={isSubmitting}
              >
                Završi
              </Button>
            ))}
          <Button variant="outlined" onClick={onEdit}>
            Uredi
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onCancelEdit} sx={jobFormModalCancelButtonSx}>
            Odustani
          </Button>
          <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
            {isNewJob ? "Dodaj" : "Spremi"}
          </Button>
        </>
      )}
    </Stack>
  </DialogActions>
);

export default JobFormModalActions;
