import Footer from "@/components/Footer";
import AllUsers from "@/content/user/all/AllUsers";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";


function ManagementAllUsers() {
    return (
        <>
            <Head>
                <title>전체 유저</title>
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
                        <AllUsers />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

ManagementAllUsers.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementAllUsers;