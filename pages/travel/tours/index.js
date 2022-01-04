// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen } from '../../../src/components';
// sections
import { NewsletterTravel } from '../../../src/sections/newsletter';
import { TravelTourList, TravelTourBarFilters } from '../../../src/sections/@travel';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function TravelToursPage() {
  const { data: tours = [], error } = useRequest({
    url: `/api/travel/tours`,
  });

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Page title="Tours - Travel">
      <RootStyle>
        <Container>
          <TravelTourBarFilters />

          <TravelTourList tours={tours} loading={!tours.length && !error} />
        </Container>

        <NewsletterTravel />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

TravelToursPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
