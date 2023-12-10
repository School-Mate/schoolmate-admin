import Footer from '@/components/Footer';
import Info from '@/content/user/info/Info';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Status404 from 'pages/404';

const UserInfo: NextPage = ({ }) => {
  const router = useRouter();
  const userId = router.query.id;
  if (!userId) {
    return <Status404 />;
  }

  return (
    <>
      <Head>
        <title>유저 정보</title>
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
            <Card>
              <Info userId={userId.toString()} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

UserInfo.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserInfo;
