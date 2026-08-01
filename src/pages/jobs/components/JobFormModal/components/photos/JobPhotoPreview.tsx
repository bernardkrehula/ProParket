import { useRef } from "react";
import type { MouseEvent } from "react";
import { Box, Dialog, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import { useClickOutside } from "#/hooks/useClickOutside";
import {
  jobPhotoPreviewBackdropSx,
  jobPhotoPreviewCloseButtonSx,
  jobPhotoPreviewContainerSx,
  jobPhotoPreviewImageSx,
  jobPhotoPreviewNextButtonSx,
  jobPhotoPreviewPaperSx,
  jobPhotoPreviewPrevButtonSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobPhotoPreviewProps = {
  url?: string | null;
  hasMultiple: boolean;
  isMobile: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

const JobPhotoPreview = ({
  url,
  hasMultiple,
  isMobile,
  onPrev,
  onNext,
  onClose,
}: JobPhotoPreviewProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useClickOutside(imageRef, onClose, Boolean(url));

  const stopAnd =
    (action: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      action();
    };

  return (
    <Dialog
      open={Boolean(url)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      slotProps={{
        backdrop: { sx: jobPhotoPreviewBackdropSx },
        paper: { sx: jobPhotoPreviewPaperSx },
      }}
    >
      {url && (
        <Box sx={jobPhotoPreviewContainerSx}>
          {isMobile && (
            <IconButton
              onClick={onClose}
              sx={jobPhotoPreviewCloseButtonSx}
              aria-label="Zatvori pregled"
            >
              <Close />
            </IconButton>
          )}

          {hasMultiple && (
            <IconButton
              onClick={stopAnd(onPrev)}
              sx={jobPhotoPreviewPrevButtonSx}
              aria-label="Prethodna fotografija"
            >
              <ChevronLeft />
            </IconButton>
          )}

          <Box
            ref={imageRef}
            component="img"
            src={url}
            sx={jobPhotoPreviewImageSx}
          />

          {hasMultiple && (
            <IconButton
              onClick={stopAnd(onNext)}
              sx={jobPhotoPreviewNextButtonSx}
              aria-label="Sljedeća fotografija"
            >
              <ChevronRight />
            </IconButton>
          )}
        </Box>
      )}
    </Dialog>
  );
};

export default JobPhotoPreview;
