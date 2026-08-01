import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  jobFormModalCancelButtonSx,
  jobFormModalTitleSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type DeleteJobDialogProps = {
  open: boolean;
  jobAddress?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteJobDialog = ({
  open,
  jobAddress,
  onCancel,
  onConfirm,
}: DeleteJobDialogProps) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle sx={jobFormModalTitleSx}>Obriši posao</DialogTitle>
    <DialogContent>
      <Typography variant="body2">
        Jeste li sigurni da želite obrisati posao "{jobAddress}"? Ova radnja se
        ne može poništiti.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} sx={jobFormModalCancelButtonSx}>
        Odustani
      </Button>
      <Button variant="contained" color="error" onClick={onConfirm}>
        Obriši
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteJobDialog;
