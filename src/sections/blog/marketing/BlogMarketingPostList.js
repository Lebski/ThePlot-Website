import PropTypes from 'prop-types';
// @mui
import { Pagination, Box } from '@mui/material';
//
import BlogMarketingPostItem from './BlogMarketingPostItem';

// ----------------------------------------------------------------------

BlogMarketingPostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogMarketingPostList({ posts }) {
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
          },
        }}
      >
        {posts.slice(0, 8).map((post) => (
          <BlogMarketingPostItem key={post.slug} post={post} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          py: { xs: 8, md: 10 },
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
