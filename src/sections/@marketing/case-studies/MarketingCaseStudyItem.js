import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography } from '@mui/material';
// routes
import Routes from '../../../routes';
// components
import { Image, TextMaxLine } from '../../../components';

// ----------------------------------------------------------------------

MarketingCaseStudyItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default function MarketingCaseStudyItem({ project }) {
  const { slug, frontmatter } = project;
  const { title, coverImg, category } = frontmatter;

  return (
    <div>
      <Image src={coverImg} alt={title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1} sx={{ p: 2.5 }}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          {category}
        </Typography>
        <NextLink
          passHref
          as={Routes.marketing.caseStudy(slug)}
          href={Routes.marketing.caseStudy('[slug]')}
        >
          <TextMaxLine variant="h5" line={1} asLink>
            {title}
          </TextMaxLine>
        </NextLink>
      </Stack>
    </div>
  );
}
