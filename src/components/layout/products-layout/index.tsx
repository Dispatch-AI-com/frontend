'use client';

import { Box, Container, styled } from '@mui/material';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const GradientNavbar = styled(Navbar)({
  /* 1️⃣ 清空自身及后代的背景色（行内样式也被 !important 覆盖） */
  '& .MuiAppBar-root, & .MuiAppBar-root *': {
    backgroundColor: 'transparent !important',
  },

  /* 2️⃣ 用 before 伪元素放渐变，置于最底层 */
  '& .MuiAppBar-root': {
    position: 'relative', // 让 ::before 绝对定位参照
    boxShadow: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      zIndex: -1, // 在所有内容下方
      background: 'linear-gradient(180deg,#f8fff3 0%,#ffffff 100%)',
    },
  },
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <GradientNavbar variant="green" />
      <Container component="main" sx={{ flex: 1 }}>
        {children}
      </Container>
      <Footer />
    </PageWrapper>
  );
}
