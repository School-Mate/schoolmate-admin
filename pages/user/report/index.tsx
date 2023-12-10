import Footer from '@/components/Footer';
import Reports from '@/content/user/report/Reports';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Process } from '@/models/report';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

function ManagementUserReport() {
  return (
    <>
      <Head>
        <title>신고 목록</title>
      </Head>

      <Container
        maxWidth="lg"
        style={{
          paddingTop: '30px'
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Reports process={Process.pending} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserReport.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserReport;
