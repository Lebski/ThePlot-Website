import PropTypes from 'prop-types';
// icons
import eventsIcon from '@iconify/icons-carbon/events';
import notebookIcon from '@iconify/icons-carbon/notebook';
// @mui
import { Stack, Avatar, Typography, Paper, Box } from '@mui/material';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import { RatingLabel, TextIconLabel, Iconify } from '../../../components';

// ----------------------------------------------------------------------

ElearningCourseTeachersInfo.propTypes = {
  teachers: PropTypes.array.isRequired,
};

export default function ElearningCourseTeachersInfo({ teachers = [] }) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Instructors {teachers.length > 0 && `(${teachers.length})`}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

TeacherItem.propTypes = {
  teacher: PropTypes.shape({
    courses: PropTypes.number,
    name: PropTypes.string,
    picture: PropTypes.string,
    ratings: PropTypes.number,
    reviews: PropTypes.number,
    role: PropTypes.string,
    students: PropTypes.number,
  }),
};

function TeacherItem({ teacher }) {
  const { picture, name, role, ratings, reviews, students, courses } = teacher;

  const labelStyle = {
    typography: 'body3',
    color: 'text.disabled',
    '& svg': { width: 20, height: 20, mr: 1 },
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Stack direction="row" spacing={3} flexWrap="wrap">
        <Avatar src={picture} sx={{ width: 72, height: 72 }} />

        <Stack spacing={1} flexGrow={1}>
          <Stack spacing={0.5}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              {role}
            </Typography>
          </Stack>

          <RatingLabel ratings={ratings} reviews={reviews} />

          <TextIconLabel
            sx={{ ...labelStyle }}
            icon={<Iconify icon={eventsIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={
              <>
                <Box component="strong" sx={{ mr: 0.25 }}>
                  {fShortenNumber(students)}
                </Box>
                Lessons
              </>
            }
          />

          <TextIconLabel
            sx={{ ...labelStyle }}
            icon={<Iconify icon={notebookIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={
              <>
                <Box component="strong" sx={{ mr: 0.25 }}>
                  {courses}
                </Box>
                Lessons
              </>
            }
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
