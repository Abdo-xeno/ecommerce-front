import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectChip({
  filterStoresBy,
  resetSortFilter,
}) {
  const [sortIndex, setSortIndex] = React.useState([]);
  React.useEffect(() => {
    setSortIndex(resetSortFilter);
  }, [resetSortFilter]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSortIndex(
      // On autofill we get a stringified value.
      value ? value.split(",") : ""
    );
    filterStoresBy(value);
  };

  return (
    <FormControl sx={{ width: "fit-content", minWidth: "150px" }}>
      <InputLabel id="demo-multiple-chip-label">Trier </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        value={sortIndex}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{ background: "#1BB18E", color: "white" }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={{
          stroke: "#1BB18E",
          ".MuiInputLabel-root": {
            color: "#1BB18E",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#1BB18E",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1BB18E",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1BB18E",
          },
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
      >
        <MenuItem value="">
          <Typography>-</Typography>
        </MenuItem>
        <MenuItem value="Nom-Descendant">
          <Typography>Nom</Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value="Nom-Ascendant">
          <Typography>Nom</Typography>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value="Date de création-Descendant">
          <Typography>Date de création</Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value="Date de création-Ascendant">
          <Typography>Date de création</Typography>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem value="Nombre de produits-Descendant">
          <Typography>Nombre de produits </Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value="Nombre de produits-Ascendant">
          <Typography>Nombre de produits</Typography>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
