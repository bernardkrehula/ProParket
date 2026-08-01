import { useQuery } from "@tanstack/react-query";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const useAddressLocation = (address: string) => {
  const placesLib = useMapsLibrary("places");
  const trimmedAddress = address.trim();

  const locationQuery = useQuery({
    queryKey: ["addressLocation", trimmedAddress],
    enabled: Boolean(placesLib) && trimmedAddress !== "",
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    queryFn: async () => {
      if (!placesLib) return null;

      const { places } = await placesLib.Place.searchByText({
        textQuery: trimmedAddress,
        fields: ["location"],
        region: "hr",
        language: "hr",
        maxResultCount: 1,
      });

      const location = places[0]?.location;

      return location ? { lat: location.lat(), lng: location.lng() } : null;
    },
  });

  return {
    position: locationQuery.data ?? null,
    isLoading: locationQuery.isFetching,
  };
};
