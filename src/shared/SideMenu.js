import * as React from "react";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";
import Stack from "@mui/material/Stack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";

import "dayjs/locale/fr";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function IconMenu({ displayAll, filterStoresBy }) {
  const [onBreak, setOnBreak] = React.useState(null);
  const [showAll, setShowAll] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const resetFilters = () => {
    setOnBreak(null);
    setFromDate(null);
    setToDate(null);
    displayAll();
  };
  if (fromDate > toDate && toDate) {
    setFromDate(toDate);
  }

  return (
    <LocalizationProvider adapterLocale={"fr"} dateAdapter={AdapterDayjs}>
      <Paper
        sx={{
          height: "fit-content",
          minWidth: "300px",
          maxWidth: "fit-content",
        }}
      >
        <MenuList
          sx={{
            "& .MuiTypography-root": {
              color: "#666D92",
            },
            input: {
              color: "#666D92",
            },
          }}
        >
          <MenuItem sx={{ pointerEvents: "none" }}>
            <ListItemIcon>
              <FilterAltIcon fontSize="medium" sx={{ color: "#1BB18E" }} />
            </ListItemIcon>
            <ListItemText>Filtres</ListItemText>
          </MenuItem>
          <Divider light />
          <MenuItem>
            <ListItemText>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Tout</Typography>
                <Switch
                  checked={showAll}
                  sx={{
                    ".MuiSwitch-switchBase": {
                      "&.Mui-checked": {
                        color: "#1BB18E",
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#1BB18E",
                        },
                      },
                    },
                  }}
                  inputProps={{ "aria-label": "ant design" }}
                  onChange={(e) => {
                    setShowAll(e.target.checked);
                    resetFilters();
                  }}
                />
              </Stack>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Congé</Typography>
                <Switch
                  checked={onBreak}
                  sx={{
                    ".MuiSwitch-switchBase": {
                      "&.Mui-checked": {
                        color: "#1BB18E",
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#1BB18E",
                        },
                      },
                    },
                  }}
                  inputProps={{ "aria-label": "ant design" }}
                  onChange={(e) => {
                    filterStoresBy(fromDate, toDate, e.target.checked);
                    setOnBreak(e.target.checked);
                    setShowAll(false);
                  }}
                />
              </Stack>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <Typography sx={{ alignItems: "center", mr: 1 }}>de</Typography>
            <DesktopDatePicker
              inputFormat="MM/DD/YYYY"
              value={fromDate}
              onChange={(e) => {
                filterStoresBy(
                  moment(e["$d"]).format("YYYYMMDD"),
                  toDate,
                  onBreak
                );
                setFromDate(moment(e["$d"]).format("YYYYMMDD"));
                setShowAll(false);
              }}
              maxDate={toDate ? toDate : moment().format()}
              renderInput={(params) => (
                <TextField
                  sx={{
                    width: "150px",

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1BB18E",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1BB18E",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1BB18E",
                      },
                    },
                  }}
                  {...params}
                />
              )}
            />
            <Typography sx={{ alignItems: "center", mr: 1, ml: 1 }}>
              à
            </Typography>
            <DesktopDatePicker
              inputFormat="MM/DD/YYYY"
              value={toDate}
              onChange={(e) => {
                filterStoresBy(
                  fromDate,
                  moment(e["$d"]).format("YYYYMMDD"),
                  onBreak
                );
                setToDate(moment(e["$d"]).format("YYYYMMDD"));
                setShowAll(false);
              }}
              maxDate={moment().format()}
              renderInput={(params) => (
                <TextField
                  sx={{
                    width: "150px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1BB18E",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1BB18E",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1BB18E",
                      },
                    },
                  }}
                  {...params}
                />
              )}
            />
          </MenuItem>
        </MenuList>
      </Paper>
    </LocalizationProvider>
  );
}
