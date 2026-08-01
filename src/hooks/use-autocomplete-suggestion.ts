import {useEffect, useRef, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';

const NO_SUGGESTIONS: google.maps.places.AutocompleteSuggestion[] = [];

export type UseAutocompleteSuggestionsReturn = {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
};

export function useAutocompleteSuggestions(
  inputString: string,
  requestOptions: Partial<google.maps.places.AutocompleteRequest> = {}
): UseAutocompleteSuggestionsReturn {
  const placesLib = useMapsLibrary('places');

  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const requestOptionsRef = useRef(requestOptions);
  useEffect(() => {
    requestOptionsRef.current = requestOptions;
  });

  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);

  const [loadedInput, setLoadedInput] = useState('');

  useEffect(() => {
    if (!placesLib || inputString === '') return;

    const {AutocompleteSessionToken, AutocompleteSuggestion} = placesLib;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    const request: google.maps.places.AutocompleteRequest = {
      ...requestOptionsRef.current,
      input: inputString,
      sessionToken: sessionTokenRef.current
    };

    let isCurrent = true;

    AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
      .then(res => {
        if (!isCurrent) return;
        setSuggestions(res.suggestions);
        setLoadedInput(inputString);
      })
      .catch(() => {
        if (!isCurrent) return;
        setSuggestions([]);
        setLoadedInput(inputString);
      });

    return () => {
      isCurrent = false;
    };
  }, [placesLib, inputString]);

  return {
    suggestions: inputString === '' ? NO_SUGGESTIONS : suggestions,
    isLoading:
      placesLib !== null && inputString !== '' && loadedInput !== inputString,
    resetSession: () => {
      sessionTokenRef.current = null;
      setSuggestions([]);
      setLoadedInput(inputString);
    }
  };
}