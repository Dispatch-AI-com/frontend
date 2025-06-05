"use client";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Chip, styled, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const BlogCardWrapper = styled(Card)(() => ({
  width: '100%',
  aspectRatio: '448 / 528',  
  padding: '12px 12px 30px',
  borderRadius: 24,
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
  },
}));

const ImageBox = styled(Box)(() => ({
  width: '100%',
  aspectRatio: '424 / 238',
  background: '#e5e5e5',
  borderRadius: 18,
  marginBottom: 20,
}));

const Title = styled(Typography)(() => ({
  color: '#060606',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: 8,
}));

const Summary = styled(Typography)(() => ({
  color: '#6d6d6d',
  fontSize: '10px',
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
  background: '#a8f574',
  color: '#060606',
  fontWeight: 600,
  fontSize: 10,
  borderRadius: 20,
  height: 24,
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
  fontSize: 11,
}));

export interface BlogCardProps {
  _id: string;
  title: string;
  summary: string;
  date: string;
  tag: string | string[];
  views?: number;
}

export default function BlogCard({ _id, title, summary, date, tag, views = 0 }: BlogCardProps) {
  //change tag into an array
  const tags = Array.isArray(tag) ? tag : (typeof tag === 'string' && tag ? [tag] : []);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${encodeURIComponent(_id)}`);
  };

  return (
    <BlogCardWrapper onClick={handleClick} >
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
        <Typography sx={{ fontWeight: 700, color: '#060606', fontSize: '12px' }}>
          Read More&nbsp;→
        </Typography>
        <MetaInfo>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AccessTimeIcon fontSize="small" />
            {new Date(date).toLocaleDateString('en-CA')}
          </Box>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <VisibilityIcon fontSize="small" />
            {views}
          </Box>
        </MetaInfo>
      </FooterRow>
    </BlogCardWrapper>
  );
}
