import PropTypes from 'prop-types';
// @mui
import { Pagination, Box } from '@mui/material';
// components
import { JobItemSkeleton } from '../../../components/skeleton';
//
import CareerJobItem from './CareerJobItem';

// ----------------------------------------------------------------------

CareerJobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function CareerJobList({ jobs, loading }) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          columnGap: 4,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(6)] : jobs).map((job, index) =>
          job ? <CareerJobItem key={job.id} job={job} /> : <JobItemSkeleton key={index} />
        )}
      </Box>

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          pt: 10,
          pb: { xs: 10, md: 15 },
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
