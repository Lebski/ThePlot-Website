import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link, Paper } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

CareerJobCompanySimilar.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default function CareerJobCompanySimilar({ jobs }) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
      <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
        Jobs From This Company
      </Typography>

      {jobs.map((job) => (
        <Stack
          key={job.id}
          spacing={0.5}
          sx={{
            py: 2,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            '&:last-child': {
              borderBottom: 0,
            },
          }}
        >
          <NextLink as={Routes.career.job(job.id)} href={Routes.career.job('[id]')} passHref>
            <Link variant="subtitle1" color="inherit">
              {job.slug}
            </Link>
          </NextLink>
          <Typography variant="body3" sx={{ color: 'text.disabled' }}>
            {fDate(job.deadline)}
          </Typography>
        </Stack>
      ))}
    </Paper>
  );
}
