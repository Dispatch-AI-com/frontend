'use client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Card,
  CardContent,
  Chip,
  styled,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const BlogCardWrapper = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: '448px',
  maxHeight: '528px',
  padding: '12px 12px 30px',
  borderRadius: 24,
  border: '1px solid #d5d5d5',
  backgroundColor: '#fff',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
  },

  [theme.breakpoints.down('md')]: {
    minHeight: '380px',
    maxHeight: '450px',
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
  fontSize: 'clamp(12px, 1.5vw, 18px)',
  lineHeight: 'clamp(18px, 2vw, 22px)',
  marginLeft: 5,
  marginRight: 5,
  marginBottom: 8,
  textOverflow: 'ellipsis',
}));

const Summary = styled(Typography)(() => ({
  color: '#6d6d6d',
  fontSize: 'clamp(8px, 1vw, 14px)',
  marginLeft: 5,
  marginRight: 5,
  marginBottom: 12,
  lineHeight: 1.5,
  maxHeight: '3em', // 最多 3 行
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const TagRow = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'clamp(6px, 1vw, 12px)',
  marginLeft: 5,
  marginRight: 5,
  marginBottom: 18,
  maxHeight: '56px',
  overflow: 'hidden',
}));

const StyledTag = styled(Chip)(() => ({
  background: '#a8f574',
  color: '#060606',
  fontWeight: 600,
  fontSize: 'clamp(8px, 1vw, 10px)',
  borderRadius: 'clamp(16px, 2vw, 20px)',
  height: 'clamp(15px, 20px, 24px)',
  padding: '0 clamp(4px, 6px, 8px)',
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
  marginRight: 10,
  color: '#7a7a7a',
  fontSize: 'clamp(9px, 1vw, 11px)',
}));

export interface BlogCardProps {
  _id: string;
  title: string;
  summary: string;
  date: string;
  tag: string | string[];
  views?: number;
}

export default function BlogCard({
  _id,
  title,
  summary,
  date,
  tag,
  views = 98,
}: BlogCardProps) {
  //change tag into an array
  const tags = Array.isArray(tag)
    ? tag
    : typeof tag === 'string' && tag
      ? [tag]
      : [];
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${encodeURIComponent(_id)}`);
  };

  return (
    <BlogCardWrapper onClick={handleClick}>
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
        <Typography
          sx={{
            fontWeight: 700,
            color: '#060606',
            fontSize: 'clamp(10px, 1vw, 12px)',
          }}
        >
          Read More&nbsp;→
        </Typography>
        <MetaInfo>
          <Box
            component="span"
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <AccessTimeIcon fontSize="small" />
            {new Date(date).toLocaleDateString('en-CA')}
          </Box>
          <Box
            component="span"
            sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <VisibilityIcon fontSize="small" />
            {views}
          </Box>
        </MetaInfo>
      </FooterRow>
    </BlogCardWrapper>
  );
}
