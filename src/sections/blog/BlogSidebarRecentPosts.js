import PropTypes from 'prop-types';
// @mui
import { Stack, Typography } from '@mui/material';
//
import BlogPostItemMobile from './BlogPostItemMobile';

// ----------------------------------------------------------------------

BlogSidebarRecentPosts.propTypes = {
  recentPosts: PropTypes.shape({
    list: PropTypes.array,
    path: PropTypes.string,
  }),
};

export default function BlogSidebarRecentPosts({ recentPosts }) {
  const { list, path } = recentPosts;

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Recent Posts
      </Typography>
      {list.map((post) => (
        <BlogPostItemMobile key={post.slug} post={post} onSiderbar path={path} />
      ))}
    </Stack>
  );
}
