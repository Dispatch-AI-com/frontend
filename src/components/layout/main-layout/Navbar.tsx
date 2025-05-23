"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AuthButton } from "./navbar/AuthButton";
import { DesktopNavItems } from "./navbar/DesktopNavItems";
import { MobileDrawer } from "./navbar/MobileDrawer";
import type { NavItemProps } from "./navbar/NavItem";

const navItems: NavItemProps[] = [
  { href: "/", text: "Home", width: 70, textWidth: 38 },
  { href: "/products", text: "Products", width: 90, textWidth: 58 },
  { href: "/pricing", text: "Pricing", width: 77, textWidth: 45 },
  { href: "/blogs", text: "Blogs", width: 68, textWidth: 36 },
  { href: "/features", text: "Features", width: 87, textWidth: 55 },
  { href: "/about", text: "About Us", width: 90, textWidth: 58 },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 72,
  marginBottom: "0",
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  width: "100%",
  maxWidth: "1920px",
  display: "flex",
  justifyContent: "space-between",
  height: "72px",
  transition: "padding 0.3s ease",
}));

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "2px 0",
});

const DesktopButtonGroup = styled(Stack)({
  alignItems: "center",
  marginLeft: "auto",
});

const MobileMenuButton = styled(IconButton)(() => ({
  marginLeft: "auto",
  transition: "transform 0.3s ease",
  borderRadius: 12,
  width: 40,
  height: 40,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("md")]: { display: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: "100vw",
    height: "100vh",
    padding: 20,
    transition: "transform 0.3s ease-in-out",
  },
}));

interface NavbarProps {
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <StyledAppBar
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor:
          variant === "light" ? theme.palette.background.default : "#060606",
        color: variant === "light" ? "inherit" : "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>
          {/* Logo */}
          <LogoBox>
            <Link href="/" aria-label="Dispatch AI Home">
              <Image
                src={variant === "light" ? "/logo.svg" : "/logo-dark.svg"}
                alt="Dispatch AI logo"
                width={126}
                height={30}
                priority
                style={{ cursor: "pointer", display: "block" }}
              />
            </Link>
          </LogoBox>

          {/* Desktop */}
          {!isMobile && (
            <>
              <DesktopNavItems navItems={navItems} themeVariant={variant} />
              <DesktopButtonGroup direction="row" spacing={1.5}>
                <AuthButton variant="login" themeVariant={variant} />
                <AuthButton variant="signup" themeVariant={variant} />
              </DesktopButtonGroup>
            </>
          )}

          {/* Mobile */}
          {isMobile && (
            <MobileMenuButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor:
                  variant === "light"
                    ? theme.palette.background.paper
                    : "#060606",
                color: variant === "light" ? "inherit" : "#ffffff",
                "&:hover": {
                  backgroundColor:
                    variant === "light"
                      ? theme.palette.background.paper
                      : "#060606",
                  color: variant === "light" ? "inherit" : "#ffffff",
                },
                transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              {mobileOpen ? (
                <CloseIcon fontSize="medium" />
              ) : (
                <MenuIcon fontSize="medium" />
              )}
            </MobileMenuButton>
          )}
        </StyledToolbar>
      </Container>

      {/* Mobile Drawer */}
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor:
              variant === "light"
                ? theme.palette.background.default
                : "#060606",
            color: variant === "light" ? "inherit" : "#ffffff",
          },
        }}
      >
        <MobileDrawer
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
          themeVariant={variant}
        />
      </StyledDrawer>
    </StyledAppBar>
  );
}
