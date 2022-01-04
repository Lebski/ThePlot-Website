import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
// @mui
import { Typography, Stack, Chip, Box } from '@mui/material';
// @utils
import { getBenefitIcon } from '../../../utils/getIcon';
// components
import { TextIconLabel } from '../../../components';
import { RootStyle as MarkdownStyle } from '../../../components/Markdown';
//
const ContactMap = dynamic(() => import('../../../components/map/ContactMap'));

// ----------------------------------------------------------------------

CareerJobDetails.propTypes = {
  job: PropTypes.shape({
    content: PropTypes.string,
    locationMap: PropTypes.array,
    otherBenefits: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default function CareerJobDetails({ job }) {
  const { skills, otherBenefits, locationMap, content } = job;

  return (
    <Stack spacing={5}>
      <MarkdownStyle>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </MarkdownStyle>

      {/* -- Skills -- */}
      <section>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Job Skills
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          {skills.map((skill) => (
            <Chip key={skill} label={skill} sx={{ m: 0.5 }} onClick={() => {}} />
          ))}
        </Stack>
      </section>

      {/* -- Other Benefits --- */}
      <section>
        <Typography variant="h4" paragraph>
          Other Benefits
        </Typography>
        <Box
          sx={{
            display: 'grid',
            rowGap: 2,
            columnGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {otherBenefits.map((benefit) => (
            <TextIconLabel key={benefit} icon={getBenefitIcon(benefit)} value={benefit} />
          ))}
        </Box>
      </section>

      {/* -- Location Map --- */}
      <section>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Location
        </Typography>
        <ContactMap offices={locationMap} sx={{ borderRadius: 2 }} />
      </section>
    </Stack>
  );
}
