import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AboutHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.dark,
  padding: theme.spacing(10, 50),
  marginTop: theme.spacing(8),
  color: theme.palette.text.primary,
  gap: theme.spacing(10),
  [theme.breakpoints.down("xl")]: {
    padding: theme.spacing(8, 20),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 5),
    flexDirection: "column",
    textAlign: "center",
  },
  [theme.breakpoints.only("sm")]: {
    padding: theme.spacing(5, 5),
    flexDirection: "column",
    textAlign: "center",
  },
}));

export const HeaderContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(5, 5),
    flexDirection: "column",
    textAlign: "center",
  },
  [theme.breakpoints.only("sm")]: {
    padding: theme.spacing(5, 5),
    flexDirection: "column",
    textAlign: "center",
  },
}));

export const HeaderImage = styled("img")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  maxWidth: "576px",
  height: "auto",
  objectFit: "cover",
}));

export const HeaderTitle = styled("h1")(({ theme }) => ({
  color: "white",
  fontSize: theme.typography.h1.fontSize,
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h1.fontWeight,
  margin: 0,
  lineHeight: 1.2,
}));

export const HeaderText = styled("p")(({ theme }) => ({
  color: "white",
  marginTop: theme.spacing(1),
  marginBottom: 0,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  whiteSpace: "nowrap",
  [theme.breakpoints.down("lg")]: {
    fontSize: theme.typography.body2.fontSize,
    whiteSpace: "normal",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.body2.fontSize,
    whiteSpace: "normal",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.body2.fontSize,
    textAlign: "center",
    whiteSpace: "normal",
  },
}));
