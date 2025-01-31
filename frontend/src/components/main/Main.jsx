import {
  Box,
  Button,
  Container,
  Rating,
  IconButton,
  Dialog,
  Stack,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
// import { Close } from "@mui/icons-material";
//   import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/products";
// import { AnimatePresence, motion } from "framer-motion";

const Main = () => {
  const theme = useTheme();
  const [alignment, setAlignment] = useState("left");
  const [open, setOpen] = useState(true);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    setmyData(newAlignment);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allProductsApi = "prouducts?populate=*";
  const menProductsApi = "prouducts?populate=*&filters[category][$eq]=men";
  const womenProductsApi ="prouducts?populate=*&filters[category][$eq]=women";

  const [myData, setmyData] = useState(allProductsApi);
  const { data, error, isLoading } = useGetproductByNameQuery(myData);
  console.log(data)

  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>

          <ToggleButtonGroup
            color="error"
            value={myData}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                color: "#e94560",
                backgroundColor: "initial",
              },
            }}
          >
            <ToggleButton
              className="myButton"
              value={allProductsApi}
              aria-label="left aligned"
              sx={{ color: theme.palette.text.primary }}
            >
              ALL PRODUCT
            </ToggleButton>
            <ToggleButton
              sx={{ mx: "16px !important", color: theme.palette.text.primary }}
              className="myButton"
              value={menProductsApi}
              aria-label="centered"
            >
              MEN CATEGORY
            </ToggleButton>
            <ToggleButton
              className="myButton"
              value={womenProductsApi}
              aria-label="right aligned"
              sx={{ color: theme.palette.text.primary }}
            >
              WOMEN CATEGORY
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data.data.map((item) => {
            return (
              <Card
                key={item}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root": {
                    scale: "1.1",
                    transition: "0.35",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.image[0].url}
                  title="green iguana"
                />
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>

                    <Typography variant="subtitle1" component="p">
                      ${item.price}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={() => {
                      handleClickOpen();
                      // setclickedProduct(item);
                    }}
                    sx={{ textTransform: "capitalize" }}
                    size="large"
                  >
                    <AddShoppingCartOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    add to cart
                  </Button>
                  <Rating
                    precision={0.1}
                    name="read-only"
                    value={item.productRating}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
        </Stack>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
              position: "absolute",
              top: 0,
              right: 10,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          {/* <ProductDetails clickedProduct={clickedProduct} /> */}
        </Dialog>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {
            // @ts-ignore
            error.error
          }
        </Typography>

        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }
};

export default Main;
