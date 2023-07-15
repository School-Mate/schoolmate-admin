import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Dashboards/PageHeader";
import Reports from "@/content/user/report/Reports";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Process } from "@/models/report";
import { Container, Grid } from "@mui/material";
import Head from "next/head";

function ManagementUserReport() {
    return (
        <>
            <Head>
                <title>신고 목록</title>
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