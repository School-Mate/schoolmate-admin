import Footer from "@/components/Footer";
import AllArticles from "@/content/article/AllArticles";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";

function ManagementAllArticles() {
    return (
        <>
            <Head>
                <title>전체 게시글</title>
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
                        <AllArticles />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

ManagementAllArticles.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementAllArticles;