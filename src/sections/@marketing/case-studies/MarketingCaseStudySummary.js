import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Divider, Stack } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { SocialsButton } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

MarketingCaseStudySummary.propTypes = {
  frontmatter: PropTypes.shape({
    category: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    socialLinks: PropTypes.object,
    title: PropTypes.string,
    website: PropTypes.string,
  }),
};

export default function MarketingCaseStudySummary({ frontmatter }) {
  const { title, description, category, website, createdAt, socialLinks } = frontmatter;

  return (
    <RootStyle>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            summary
          </Typography>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={1}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Website
          </Typography>
          <Typography variant="body2">{website}</Typography>

          <Typography variant="overline" sx={{ color: 'text.disabled', pt: 1 }}>
            Category
          </Typography>
          <Typography variant="body2" sx={{ pb: 1 }}>
            {category}
          </Typography>

          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Date
          </Typography>
          <Typography variant="body2">{fDate(createdAt)}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="subtitle2">Share:</Typography>
          <SocialsButton initialColor links={socialLinks} />
        </Stack>
      </Stack>
    </RootStyle>
  );
}
