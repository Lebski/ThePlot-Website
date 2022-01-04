import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Link, Paper } from '@mui/material';
// components
import { Image } from '../../../components';

// ----------------------------------------------------------------------

CareerJobCompanyInfo.propTypes = {
  job: PropTypes.shape({
    companyLogo: PropTypes.string,
    companyName: PropTypes.string,
  }),
};

export default function CareerJobCompanyInfo({ job }) {
  const { companyLogo, companyName } = job;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Image
          alt={companyName}
          src={companyLogo}
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />

        <Stack spacing={0.5}>
          <Typography variant="h6">{companyName}</Typography>
          <Link variant="body3" sx={{ color: 'text.secondary' }}>
            View Company Profile
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
