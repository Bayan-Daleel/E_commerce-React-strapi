import Fab from "@mui/material/Fab";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useScrollTrigger, Zoom } from "@mui/material";

const ScrollToTop = () => {
    return (
    <Zoom in={useScrollTrigger({threshold:100})}>
      <Fab
       onClick={() => { 
        window.scrollTo(0,0)
        }
       }
        size="small"
        sx={{ position: "fixed", bottom: 33, right: 33 }}
        color="primary"
        aria-label="add"
        variant="extended"
      >
        <KeyboardArrowUpOutlinedIcon  fontSize="medium"/>
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
