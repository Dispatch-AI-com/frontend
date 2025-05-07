"use client";
import { Box, Card, CardContent, Chip, styled, Typography } from '@mui/material';

const BlogCardWrapper = styled(Card)(() => ({
  width: '100%',               // 占满 Grid 分配的宽度
  height: 528,
  padding: '12px 12px 30px',
  borderRadius: 24,
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

const ImageBox = styled(Box)(() => ({
  width: '100%',
  height: 220,
  background: '#e5e5e5',
  borderRadius: 18,
  marginBottom: 28,
}));

const Title = styled(Typography)(() => ({
  color: '#111',
  fontWeight: 700,
  fontSize: 22,
  lineHeight: 1.2,
  marginBottom: 8,
}));

const Summary = styled(Typography)(() => ({
  color: '#7a7a7a',
  fontSize: 15,
  marginBottom: 12,
  lineHeight: 1.5,
}));

const TagRow = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginBottom: 18,
}));

const StyledTag = styled(Chip)(() => ({
  background: '#A7FF9B',
  color: '#222',
  fontWeight: 600,
  fontSize: 14,
  borderRadius: 20,
  padding: '0 10px',
  height: 32,
}));

const FooterRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 'auto',
  width: '100%',
}));

const MetaInfo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  color: '#7a7a7a',
  fontSize: 15,
}));

export interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  tag: string | string[];
  views?: number;
}

export default function BlogCard({ title, summary, date, tag, views = 2036 }: BlogCardProps) {
  //change tag into an array
  const tags = Array.isArray(tag) ? tag : (typeof tag === 'string' && tag ? [tag] : []);
  return (
    <BlogCardWrapper>
      <ImageBox />
      <CardContent sx={{ p: 0 }}>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <TagRow>
          {tags.map((t, idx) => (
            <StyledTag key={idx} label={t} />
          ))}
        </TagRow>
      </CardContent>
      <FooterRow>
        <Typography sx={{ fontWeight: 700, color: '#111', fontSize: 17 }}>
          Read More&nbsp;→
        </Typography>
        <MetaInfo>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span role="img" aria-label="date">🗓️</span>
            {date}
          </Box>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span role="img" aria-label="views">👁️</span>
            {views}
          </Box>
        </MetaInfo>
      </FooterRow>
    </BlogCardWrapper>
  );
}
