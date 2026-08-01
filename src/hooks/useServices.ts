import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { requestServices } from "#/api/services/requestServices";

export const useServices = () => {
  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: requestServices,
  });

  const maps = useMemo(() => {
    const response = servicesQuery.data;
    const list =
      response && "data" in response && response.data ? response.data : [];

    const serviceNames: string[] = [];
    const serviceIdToName = new Map<string, string>();
    const serviceNameToId = new Map<string, string>();
    const servicePriceByName = new Map<string, number>();

    list.map((service) => {
      serviceNames.push(service.name);
      serviceIdToName.set(service.id, service.name);
      serviceNameToId.set(service.name, service.id);
      servicePriceByName.set(service.name, Number(service.price_per_m2));
    });

    return {
      serviceNames,
      serviceIdToName,
      serviceNameToId,
      servicePriceByName,
    };
  }, [servicesQuery.data]);

  return {
    ...maps,
    isLoading: servicesQuery.isLoading,
    isError: servicesQuery.isError,
  };
};
