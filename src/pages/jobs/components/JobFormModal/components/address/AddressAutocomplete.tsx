import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { useAddressLocation } from "#/hooks/useAddressLocation";
import { useAutocompleteSuggestions } from "#/hooks/use-autocomplete-suggestion";
import { useDebouncedValue } from "#/hooks/useDebouncedValue";
import AddressMapPreview from "./AddressMapPreview";
import {
  filterSuggestions,
  type AddressSuggestion,
} from "#/pages/jobs/components/JobFormModal/utils/suggestionsFilter";
import {
  addressAttributionSx,
  addressOptionIconSx,
  addressOptionMainSx,
  addressOptionSecondarySx,
  addressOptionSx,
  addressSuggestionsPaperSx,
} from "#/pages/jobs/components/JobFormModal/utils/jobFormModalConfig";

const ADDRESS_REQUEST_OPTIONS: Partial<google.maps.places.AutocompleteRequest> =
  {
    includedRegionCodes: ["hr"],
    language: "hr",
  };

const SuggestionsPaper = ({
  children,
  ...paperProps
}: HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
  <Paper {...paperProps} sx={addressSuggestionsPaperSx}>
    {children}
    <Typography component="span" sx={addressAttributionSx}>
      Powered by Google
    </Typography>
  </Paper>
);

type AddressAutocompleteProps = {
  value: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
};

const AddressAutocomplete = ({
  value,
  onValueChange,
  error,
  helperText,
}: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const debouncedQuery = useDebouncedValue(query);
  const { suggestions, isLoading, resetSession } = useAutocompleteSuggestions(
    debouncedQuery,
    ADDRESS_REQUEST_OPTIONS,
  );

  const [initialAddress] = useState(value);
  const isUnchanged = value === initialAddress;

  const { position: savedPosition } = useAddressLocation(
    coordinates === null && isUnchanged ? initialAddress : "",
  );

  const previewPosition = coordinates ?? (isUnchanged ? savedPosition : null);

  const options = filterSuggestions(suggestions);
  const isWaiting = query !== "" && (isLoading || debouncedQuery !== query);

  const handleInputChange = (
    _event: unknown,
    nextValue: string,
    reason: string,
  ) => {
    setInputValue(nextValue);

    if (reason !== "input") return;

    onValueChange(nextValue);
    setQuery(nextValue);
  };

  const handleChange = async (
    _event: unknown,
    selected: string | AddressSuggestion | null,
  ) => {
    if (selected === null) {
      setInputValue("");
      onValueChange("");
      setQuery("");
      setCoordinates(null);
      return;
    }

    const label = typeof selected === "string" ? selected : selected.label;

    setInputValue(label);
    onValueChange(label);
    setQuery("");

    if (typeof selected === "string") {
      setCoordinates(null);
      return;
    }

    setIsLocating(true);

    try {
      const place = selected.prediction.toPlace();
      await place.fetchFields({ fields: ["location"] });

      const { location } = place;
      setCoordinates(
        location ? { lat: location.lat(), lng: location.lng() } : null,
      );
    } catch {
      setCoordinates(null);
    } finally {
      setIsLocating(false);
      resetSession();
    }
  };

  return (
    <Stack spacing={1.5}>
      <Autocomplete<AddressSuggestion, false, false, true>
        freeSolo
        autoComplete
        includeInputInList
        handleHomeEndKeys
        options={options}
        filterOptions={(allOptions) => allOptions}
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label
        }
        isOptionEqualToValue={(option, selected) =>
          typeof option !== "string" &&
          typeof selected !== "string" &&
          option.placeId === selected.placeId
        }
        loading={isWaiting}
        slots={{ paper: SuggestionsPaper }}
        slotProps={{ listbox: { sx: { maxHeight: 280 } } }}
        renderOption={({ key, ...optionProps }, option) => (
          <Box component="li" key={key} {...optionProps}>
            <Box sx={addressOptionSx}>
              <LocationOnOutlined sx={addressOptionIconSx} />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={addressOptionMainSx}>
                  {option.mainText}
                </Typography>
                {option.secondaryText && (
                  <Typography sx={addressOptionSecondarySx}>
                    {option.secondaryText}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Adresa"
            placeholder="Počnite tipkati adresu"
            required
            error={error}
            helperText={helperText}
            fullWidth
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                endAdornment: (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ alignItems: "center" }}
                  >
                    {(isWaiting || isLocating) && (
                      <CircularProgress size={16} color="inherit" />
                    )}
                    {params.slotProps.input.endAdornment}
                  </Stack>
                ),
              },
            }}
          />
        )}
      />

      {previewPosition && (
        <AddressMapPreview position={previewPosition} label={value} />
      )}
    </Stack>
  );
};

export default AddressAutocomplete;
