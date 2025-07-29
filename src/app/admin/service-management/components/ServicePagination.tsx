import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from '@/theme';

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(4),

  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
    gap: theme.spacing(0.5),
  },

  [theme.breakpoints.down('xs')]: {
    marginTop: theme.spacing(2),
  },
}));

const PageButton = styled(Box, {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active?: boolean }>(({ theme, $active }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: $active ? '#000' : 'transparent',
  color: $active ? '#fff' : '#000',
  fontWeight: $active ? 'bold' : 'normal',
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: $active ? '#000' : 'rgba(0,0,0,0.04)',
  },

  [theme.breakpoints.down('sm')]: {
    width: 28,
    height: 28,
    margin: theme.spacing(0, 0.25),
  },

  [theme.breakpoints.down('xs')]: {
    width: 24,
    height: 24,
    margin: theme.spacing(0, 0.125),
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  color: '#000',

  '&.Mui-disabled': {
    color: '#ccc',
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },

  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.25),
  },
}));

const PageNumber = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.7rem',
  },
}));

export default function ServicePagination({
  page,
  onPageChange,
  totalPages = 5,
}: {
  page: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Only show current page and adjacent pages on small screens
  const getVisiblePages = () => {
    if (isExtraSmallScreen) {
      // Extra small screen only shows current page
      return [page];
    } else if (isSmallScreen) {
      // Small screen shows current page and adjacent pages
      const pages = [];
      if (page > 1) pages.push(page - 1);
      pages.push(page);
      if (page < totalPages) pages.push(page + 1);
      return pages;
    } else {
      // Large screen shows all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      <NavigationButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        size={isExtraSmallScreen ? 'small' : 'medium'}
      >
        <ChevronLeftIcon fontSize={isExtraSmallScreen ? 'small' : 'medium'} />
      </NavigationButton>

      {visiblePages.map(p => (
        <PageButton
          key={p}
          $active={page === p}
          onClick={() => onPageChange(p)}
        >
          <PageNumber variant={isSmallScreen ? 'caption' : 'body2'}>
            {p}
          </PageNumber>
        </PageButton>
      ))}

      <NavigationButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        size={isExtraSmallScreen ? 'small' : 'medium'}
      >
        <ChevronRightIcon fontSize={isExtraSmallScreen ? 'small' : 'medium'} />
      </NavigationButton>
    </PaginationContainer>
  );
}
