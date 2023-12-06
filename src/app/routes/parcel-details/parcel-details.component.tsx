import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Spinner from "../../common/spinner/spinner.component";
import ParcelDetailsDeparture from "../../features/parcel-creation/parcel-details-departure/parcel-details-departure.component";
import ParcelDetailsDestination from "../../features/parcel-creation/parcel-details-destination/parcel-details-destination.component";
import { useEffect } from "react";

const ParcelDetails = () => {

  const { parcelCreationStore: { shipmentCountries, loadShipmentCountries }} = useStore();

  useEffect(() => {
    loadShipmentCountries();
  }, [loadShipmentCountries])

  if (shipmentCountries.length === 0) return <Spinner />

  return (
    <>
      <ParcelDetailsDeparture />
      <ParcelDetailsDestination />
    </>
  )
}

export default observer(ParcelDetails);