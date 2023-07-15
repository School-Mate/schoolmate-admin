import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Dashboards/PageHeader";
import BoardRequests from "@/content/school/board/BoardRequests";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Process } from "@/models/boardRequest";
import { Container, Grid } from "@mui/material";
import Head from "next/head";

function ManagementBoardRequest() {
    return (
        <>
            <Head>
                <title>게시판 요청</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <BoardRequests process={Process.pending} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

ManagementBoardRequest.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementBoardRequest;