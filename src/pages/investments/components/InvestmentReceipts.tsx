import { useMemo, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMediaQuery, useTheme } from "@mui/material";
import { requestInvestmentReceipts } from "#/api/investments/requestInvestmentReceipts";
import { requestAddInvestmentReceipt } from "#/api/investments/requestAddInvestmentReceipt";
import { requestDeleteInvestmentReceipt } from "#/api/investments/requestDeleteInvestmentReceipt";
import JobPhotoPreview from "#/pages/jobs/components/JobFormModal/components/photos/JobPhotoPreview";
import {
  investmentReceiptsSectionSx,
  investmentReceiptsHeaderSx,
  investmentReceiptsLabelSx,
  investmentReceiptsAddButtonSx,
  investmentReceiptsGridSx,
  investmentReceiptWrapperSx,
  investmentReceiptThumbnailSx,
  investmentReceiptDeleteButtonSx,
  investmentReceiptsEmptySx,
} from "#/pages/investments/investmentsConfig";

type InvestmentReceiptsProps = {
  investmentId: string;
};

const InvestmentReceipts = ({ investmentId }: InvestmentReceiptsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const receiptsQuery = useQuery({
    queryKey: ["investmentReceipts", investmentId],
    queryFn: () => requestInvestmentReceipts(investmentId),
  });

  const receipts = useMemo(() => {
    const response = receiptsQuery.data;
    if (!response || !("data" in response) || !response.data) return [];

    return response.data;
  }, [receiptsQuery.data]);

  const invalidateReceipts = () => {
    queryClient.invalidateQueries({
      queryKey: ["investmentReceipts", investmentId],
    });
  };

  const addReceiptMutation = useMutation({
    mutationFn: (receipt: File) =>
      requestAddInvestmentReceipt(investmentId, receipt),
    onSuccess: invalidateReceipts,
    onError: () =>
      setReceiptError("Došlo je do pogreške prilikom dodavanja računa."),
  });

  const deleteReceiptMutation = useMutation({
    mutationFn: (fileName: string) =>
      requestDeleteInvestmentReceipt(investmentId, fileName),
    onSuccess: invalidateReceipts,
    onError: () =>
      setReceiptError("Došlo je do pogreške prilikom brisanja računa."),
  });

  const handleReceiptChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setReceiptError(null);
    addReceiptMutation.mutate(file);
  };

  const onDeleteReceipt =
    (fileName: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      deleteReceiptMutation.mutate(fileName);
    };

  const onPrevReceipt = () =>
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev - 1 + receipts.length) % receipts.length,
    );

  const onNextReceipt = () =>
    setPreviewIndex((prev) =>
      prev === null ? prev : (prev + 1) % receipts.length,
    );

  const previewReceipt = previewIndex !== null ? receipts[previewIndex] : null;

  return (
    <Box sx={investmentReceiptsSectionSx}>
      <Stack direction="row" sx={investmentReceiptsHeaderSx}>
        <Typography sx={investmentReceiptsLabelSx}>Računi</Typography>
        <Button
          component="label"
          size="small"
          startIcon={<ReceiptLongOutlinedIcon />}
          disabled={addReceiptMutation.isPending}
          sx={investmentReceiptsAddButtonSx}
        >
          {addReceiptMutation.isPending ? "Učitavanje..." : "Dodaj račun"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleReceiptChange}
          />
        </Button>
      </Stack>

      {receiptError && (
        <Typography variant="caption" color="error">
          {receiptError}
        </Typography>
      )}

      {receipts.length > 0 ? (
        <Box sx={investmentReceiptsGridSx}>
          {receipts.map((receipt, index) => (
            <Box key={receipt.name} sx={investmentReceiptWrapperSx}>
              <Box
                component="img"
                src={receipt.url ?? undefined}
                alt={`Račun: ${receipt.name}`}
                onClick={() => setPreviewIndex(index)}
                sx={investmentReceiptThumbnailSx}
              />
              <IconButton
                size="small"
                onClick={onDeleteReceipt(receipt.name)}
                sx={investmentReceiptDeleteButtonSx}
                aria-label={`Ukloni račun: ${receipt.name}`}
              >
                <Close fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography sx={investmentReceiptsEmptySx}>
          Nema priloženih računa.
        </Typography>
      )}

      <JobPhotoPreview
        url={previewReceipt?.url}
        hasMultiple={receipts.length > 1}
        isMobile={isMobile}
        onPrev={onPrevReceipt}
        onNext={onNextReceipt}
        onClose={() => setPreviewIndex(null)}
      />
    </Box>
  );
};

export default InvestmentReceipts;
