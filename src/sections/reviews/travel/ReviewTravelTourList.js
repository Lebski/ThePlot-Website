import PropTypes from 'prop-types';
// @mui
import { Box, Pagination } from '@mui/material';
//
import ReviewTravelTourItem from './ReviewTravelTourItem';

// ----------------------------------------------------------------------

ReviewTravelTourList.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default function ReviewTravelTourList({ reviews }) {
  return (
    <>
      {reviews.map((review) => {
        const hasReply = review.replies.length > 0;

        return (
          <Box key={review.id}>
            <ReviewTravelTourItem
              name={review.name}
              avatarUrl={review.avatarUrl}
              postedAt={review.postedAt}
              message={review.message}
              rating={review.rating}
              helpful={review.helpful}
            />
            {hasReply &&
              review.replies.map((reply) => {
                const user = review.participants.find(
                  (participant) => participant.id === reply.userId
                );

                return (
                  <ReviewTravelTourItem
                    key={reply.id}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    message={reply.message}
                    name={user?.name || ''}
                    avatarUrl={user?.avatarUrl}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          pt: 5,
          pb: { xs: 10, md: 15 },
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
