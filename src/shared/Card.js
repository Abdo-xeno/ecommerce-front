import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StoreModal from "../components/store/storeEdit/StoreModal";
import { storeServices } from "../services/storeService";
import moment from "moment/moment";
import "moment/locale/fr";
import { BsCircleFill } from "react-icons/bs";

export default function DescriptionCard({ data, getStores }) {
  const formattedCreatedDate = moment(data.createdAt).format("MMMM Do YYYY");
  const formattedOpenTime = moment(data.openTime).format("HH:mm:ss");
  const formattedCloseTime = moment(data.closeTime).format("HH:mm:ss");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalData, setModalData] = React.useState({ data: null });
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [openStoreModal, setOpenStoreModal] = React.useState(false);
  React.useEffect(() => {
    storeServices.getStoreCategoriesById(data.id).then((res) => {
      setCategories(res.data);
    });
  }, [open]);
  const handleOpenEditStore = () => {
    setOpenStoreModal(true);
    setModalData({ action: "editStore", storeData: data });
    setAnchorEl(null);
  };
  const handleDeleteStore = () => {
    setOpenStoreModal(true);
    setModalData({ action: "deleteStore", storeData: data });
    setAnchorEl(null);
  };
  const handleCloseStoreModal = () => {
    setOpenStoreModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    navigate("/stores/" + data.id);
  };
  return (
    <Card
      sx={{
        width: "350px",
        "& .MuiTypography-root": {
          color: "#666D92",
        },
      }}
    >
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={handleClick}
            sx={{ color: "#1BB18E" }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
        subheader={
          <>
            <Typography>
              Date de création : {formattedCreatedDate}
              <br />
              Horaires : de {formattedOpenTime} à {formattedCloseTime}
            </Typography>

            {moment().format("LTS") < formattedCloseTime &&
            moment().format("LTS") > formattedOpenTime &&
            !data.onBreak ? (
              <Typography sx={{ display: "inline-flex" }}>
                Statut : Ouvert
                <BsCircleFill
                  style={{ marginTop: 4, marginLeft: 5 }}
                  color="#1BB18E"
                />
              </Typography>
            ) : (
              <Typography sx={{ display: "inline-flex" }}>
                Statut : Fermé
                <BsCircleFill
                  style={{ marginTop: 4, marginLeft: 5 }}
                  color="#fcd36a"
                />
              </Typography>
            )}
          </>
        }
      />
      <CardMedia
        component="img"
        height="150"
        image={
          moment().format("LTS") < formattedCloseTime &&
          moment().format("LTS") > formattedOpenTime &&
          !data.onBreak
            ? require("../assets/store-open.png")
            : require("../assets/store-closed.png")
        }
        alt="Store open"
        onClick={(e) => console.log(e)}
      />
      <CardContent sx={{ width: "80%" }}>
        <Typography variant="body2" color="text.secondary">
          {data.description ? data.description : "Pas de description"}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Nombre de produits :{data.products ? data.products.length : 0}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Nombre de catégories : {categories.length}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Congé : {data.onBreak ? "Oui" : "Non"}
        </Typography>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleOpenEditStore}>Modifier</MenuItem>
          <MenuItem onClick={handleEdit}>Modifier les produits</MenuItem>
          <MenuItem onClick={handleDeleteStore}>Supprimer</MenuItem>
        </Menu>
        <StoreModal
          open={openStoreModal}
          onClose={handleCloseStoreModal}
          data={modalData}
          getStores={getStores}
        ></StoreModal>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "#1BB18E" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "#1BB18E" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
