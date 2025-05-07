"use client"
import { Box, Card, CardContent, styled,Typography } from '@mui/material';

const HighlightCard = styled(Card)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: '#181818',
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  minHeight: 120,
}));

const ImageBox = styled(Box)(() => ({
  width: 120,
  height: 80,
  background: '#cfcfcf',
  borderRadius: 12,
  marginRight: 24,
  overflow: 'hidden',
}));

export default function BlogHighlightCard() {
  return (
    <HighlightCard>
      <ImageBox>
        {/* 可替换为实际图片 */}
      </ImageBox>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle2" color="#A7FF9B" fontWeight={700}>
          Latest
        </Typography>
        <Typography variant="h6" color="white" fontWeight={700} gutterBottom>
          Lazy Day: Smarter Recruitment for Operations
        </Typography>
        <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
          The game-changer for dispatchers: how AI is transforming the way you hire and manage your team.
        </Typography>
      </CardContent>
    </HighlightCard>
  );
}
