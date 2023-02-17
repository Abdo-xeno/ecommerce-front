import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CollapsedFilters() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Catégories</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MenuItem>
          <Checkbox defaultChecked />
          <Typography>Nom</Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <Checkbox />
          <Typography>Nom</Typography>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <Checkbox />
          <Typography>Date de création</Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <Checkbox />
          <Typography>Nombre de produit </Typography>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <Checkbox />
          <Typography>Nombre de produit</Typography>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </AccordionDetails>
    </Accordion>
  );
}
