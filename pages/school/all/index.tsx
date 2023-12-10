import Footer from "@/components/Footer";
import AllSchools from "@/content/school/all/AllSchools";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";

function ManagementAllSchools() {
    return (
        <>
            <Head>
                <title>전체 학교 목록</title>
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
                        <AllSchools />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

ManagementAllSchools.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementAllSchools;