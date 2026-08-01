import { useMemo, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestAddJobPhoto } from "#/api/jobs/requestAddJobPhoto";
import { requestDeleteJobPhoto } from "#/api/jobs/requestDeleteJobPhoto";
import { requestJobPhotos } from "#/api/jobs/requestJobPhotos";
import JobPhotoPreview from "./JobPhotoPreview";
import {
  jobDetailLabelSx,
  jobPhotoActionsRowSx,
  jobPhotoDeleteButtonSx,
  jobPhotoGridSx,
  jobPhotoSectionSx,
  jobPhotoThumbnailSx,
  jobPhotoThumbnailWrapperSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

type JobPhotosSectionProps = {
  jobId: string;
  isViewMode: boolean;
  isMobile: boolean;
};

const JobPhotosSection = ({
  jobId,
  isViewMode,
  isMobile,
}: JobPhotosSectionProps) => {
  const queryClient = useQueryClient();
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const photosQuery = useQuery({
    queryKey: ["jobPhotos", jobId],
    queryFn: () => requestJobPhotos(jobId),
  });

  const photos = useMemo(() => {
    const response = photosQuery.data;
    if (!response || !("data" in response) || !response.data) return [];

    return response.data;
  }, [photosQuery.data]);

  const invalidatePhotos = () => {
    queryClient.invalidateQueries({ queryKey: ["jobPhotos", jobId] });
  };

  const addPhotoMutation = useMutation({
    mutationFn: (photo: File) => requestAddJobPhoto(jobId, photo),
    onSuccess: invalidatePhotos,
    onError: () => {
      setPhotoError("Došlo je do pogreške prilikom dodavanja fotografije.");
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: (fileName: string) => requestDeleteJobPhoto(jobId, fileName),
    onSuccess: invalidatePhotos,
    onError: () => {
      setPhotoError("Došlo je do pogreške prilikom brisanja fotografije.");
    },
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setPhotoError(null);
    addPhotoMutation.mutate(file);
  };

  const onPreviewPhoto = (index: number) => () => setPreviewIndex(index);

  const onDeletePhoto =
    (fileName: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      deletePhotoMutation.mutate(fileName);
    };

  const onClosePreview = () => setPreviewIndex(null);

  const onPrevPhoto = () =>
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev - 1 + photos.length) % photos.length,
    );

  const onNextPhoto = () =>
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev + 1) % photos.length,
    );

  const previewPhoto = previewIndex !== null ? photos[previewIndex] : null;

  return (
    <Stack spacing={1} sx={jobPhotoSectionSx}>
      <Typography variant="caption" sx={jobDetailLabelSx}>
        Fotografije
      </Typography>

      {!isViewMode && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={jobPhotoActionsRowSx}
        >
          <Button
            component="label"
            variant="outlined"
            disabled={addPhotoMutation.isPending}
          >
            {addPhotoMutation.isPending ? "Učitavanje..." : "Dodaj fotografiju"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </Button>
          {addPhotoMutation.isSuccess && !photoError && (
            <Typography variant="caption" color="success.main">
              Fotografija uspješno dodana.
            </Typography>
          )}
        </Stack>
      )}

      {photoError && (
        <Typography variant="caption" color="error">
          {photoError}
        </Typography>
      )}

      {photos.length > 0 ? (
        <Box sx={jobPhotoGridSx}>
          {photos.map((photo, index) => (
            <Box key={photo.name} sx={jobPhotoThumbnailWrapperSx}>
              <Box
                component="img"
                src={photo.url ?? undefined}
                onClick={onPreviewPhoto(index)}
                sx={jobPhotoThumbnailSx}
              />
              {!isViewMode && (
                <IconButton
                  size="small"
                  onClick={onDeletePhoto(photo.name)}
                  sx={jobPhotoDeleteButtonSx}
                  aria-label={`Ukloni fotografiju: ${photo.name}`}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Nema dodanih fotografija.
        </Typography>
      )}

      <JobPhotoPreview
        url={previewPhoto?.url}
        hasMultiple={photos.length > 1}
        isMobile={isMobile}
        onPrev={onPrevPhoto}
        onNext={onNextPhoto}
        onClose={onClosePreview}
      />
    </Stack>
  );
};

export default JobPhotosSection;
