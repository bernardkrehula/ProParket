import { useAddressLocation } from "#/hooks/useAddressLocation";
import AddressMapPreview from "./AddressMapPreview";

type JobAddressMapProps = {
  address: string;
};

const JobAddressMap = ({ address }: JobAddressMapProps) => {
  const { position } = useAddressLocation(address);

  if (!position) return null;

  return <AddressMapPreview position={position} label={address} />;
};

export default JobAddressMap;
