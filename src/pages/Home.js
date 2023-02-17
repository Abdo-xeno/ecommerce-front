import * as React from "react";
import { Grid } from "@mui/material";
import SideMenu from "../shared/SideMenu";
import StoreList from "../components/store/StoreList";
import { storeServices } from "../services/storeService";
import moment from "moment/moment";

export default function Home() {
  const [storesData, setStoresData] = React.useState();
  const [resetSortFilter, setResetSortFilter] = React.useState([]);
  const [filteredStoreData, setFilteredStoreData] = React.useState();
  const [filteredDataByBreakOn, setFilteredDataByBreakOn] = React.useState();
  const [filteredDataByBreakOff, setFilteredDataByBreakOff] = React.useState();

  React.useEffect(() => {
    storeServices.getStores().then((res) => {
      setStoresData(res);
      setFilteredStoreData(res);
      setFilteredDataByBreakOn(res.filter((store) => store.onBreak));
      setFilteredDataByBreakOff(res.filter((store) => !store.onBreak));
    });
  }, []);

  const filterArrayByDate = (fromDate, toDate, arrayToFilter) => {
    if (fromDate && toDate) {
      setFilteredStoreData(
        [...arrayToFilter].filter(
          (store) =>
            moment(store.createdAt).format("YYYYMMDD") >= fromDate &&
            moment(store.createdAt).format("YYYYMMDD") <= toDate
        )
      );
    } else if (fromDate && !toDate) {
      setFilteredStoreData(
        [...arrayToFilter].filter(
          (store) => moment(store.createdAt).format("YYYYMMDD") >= fromDate
        )
      );
    } else if (!fromDate && toDate) {
      setFilteredStoreData(
        [...arrayToFilter].filter(
          (store) => moment(store.createdAt).format("YYYYMMDD") <= toDate
        )
      );
    } else {
      setFilteredStoreData([...arrayToFilter]);
    }
  };

  const filterStoresBy = (fromDate, toDate, onBreak) => {
    if (onBreak) {
      filterArrayByDate(fromDate, toDate, filteredDataByBreakOn);
    } else if (onBreak === false) {
      filterArrayByDate(fromDate, toDate, filteredDataByBreakOff);
    } else {
      filterArrayByDate(fromDate, toDate, storesData);
    }
    setResetSortFilter([]);
  };

  const displayAll = () => {
    setFilteredStoreData(storesData);
    setResetSortFilter([]);
  };
  const getStores = () => {
    storeServices.getStores().then((res) => {
      setStoresData(res);
      setFilteredStoreData(res);
      setFilteredDataByBreakOn(res.filter((store) => store.onBreak));
      setFilteredDataByBreakOff(res.filter((store) => !store.onBreak));
    });
  };

  return (
    <>
      <Grid
        container
        style={{ marginTop: "1%" }}
        display="flex"
        direction="row"
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid item sx={{ ml: 2 }}>
          <SideMenu displayAll={displayAll} filterStoresBy={filterStoresBy} />
        </Grid>
        <Grid item xs>
          <StoreList
            data={filteredStoreData}
            resetSortFilter={resetSortFilter}
            getStores={getStores}
          />
        </Grid>
      </Grid>
    </>
  );
}
