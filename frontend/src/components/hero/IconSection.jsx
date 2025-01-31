import {
  AccessAlarmOutlined,
  CreditScoreOutlined,
  ElectricBoltOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  Container,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
const IconSection = () => {
  const theme=useTheme();
  return (
    <Container sx={{ mt:3,bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff" }}>
      <Stack
        sx={{ flexWrap: "wrap" }}
        direction={"row"}
        divider={useMediaQuery('(min-width:600px)')?<Divider orientation="vertical" flexItem />:null}
      >
        <MyBox
          icon={<ElectricBoltOutlined />}
          title={"Fast Delivery"}
          subTitle={"Start from $10"}
        />
        <MyBox
          icon={<WorkspacePremiumOutlined />}
          title={"Money Guarantee"}
          subTitle={"7 Days Back"}
        />
        <MyBox
          icon={<AccessAlarmOutlined />}
          title={"365 Days"}
          subTitle={"For free return"}
        />
        <MyBox
          icon={<CreditScoreOutlined />}
          title={"Payment"}
          subTitle={"Secure system"}
        />
      </Stack>
    </Container>
  );
};

export default IconSection;

const MyBox = ({ icon, title, subTitle }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        justifyContent:useMediaQuery('(min-width:600px)')?"center":"left",
        width: 250,
        display: "flex",
        flexGrow: 1,
        gap: 3,
        py: 1.6,
      }}
    >
      {icon}
      <Box>
        <Typography variant="body1">{title}</Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};
