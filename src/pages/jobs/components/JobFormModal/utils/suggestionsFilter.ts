export type AddressSuggestion = {
  placeId: string;
  label: string;
  mainText: string;
  secondaryText: string;
  prediction: google.maps.places.PlacePrediction;
};

export const filterSuggestions = (
  suggestions: google.maps.places.AutocompleteSuggestion[],
): AddressSuggestion[] =>
  suggestions.flatMap((suggestion) => {
    const prediction = suggestion.placePrediction;
    if (!prediction) return [];

    const label = prediction.text.text;

    return [
      {
        placeId: prediction.placeId,
        label,
        mainText: prediction.mainText?.text ?? label,
        secondaryText: prediction.secondaryText?.text ?? "",
        prediction,
      },
    ];
  });
