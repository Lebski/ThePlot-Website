import PropTypes from 'prop-types';
// @mui
import { Pagination, Stack } from '@mui/material';
// components
import { CourseItemSkeleton } from '../../../components/skeleton';
//
import ElearningCourseItem from './ElearningCourseItem';

// ----------------------------------------------------------------------

ElearningCourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function ElearningCourseList({ courses, loading }) {
  return (
    <>
      <Stack spacing={4}>
        {(loading ? [...Array(6)] : courses).map((course, index) => (
          <div key={course?.id || index}>
            {course ? <ElearningCourseItem course={course} /> : <CourseItemSkeleton />}
          </div>
        ))}
      </Stack>

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
