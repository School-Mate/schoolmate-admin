import Footer from '@/components/Footer';
import VerifyRequests from '@/content/user/verify/VerifyRequests';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Process } from '@/models/verifyRequest';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';

function ManagementUserVerify() {
  const [process, setProcess] = useState<Process>(Process.pending);
  return (
    <>
      <Head>
        <title>학교 인증 요청</title>
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
            <VerifyRequests process={process} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserVerify.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserVerify;
