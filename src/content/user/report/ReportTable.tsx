import Label from "@/components/Label";
import { Process, Report } from "@/models/report"
import { client } from "@/utils/client";
import { Box, Button, Card, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

const getProcessLabel = (reportProcess: Process): JSX.Element => {
    const processMaps = {
        success: {
            text: '처리됨',
            color: 'success'
        },
        pending: {
            text: '처리중',
            color: 'warning'
        },
    };

    const { text, color }: any = processMaps[reportProcess];
    return <Label color={color}>{text}</Label>;
};

interface ReportTableProps {
    className?: string;
    reports: Report[];
    reloadReports: () => void;
}

const applyPagination = (
    reports: Report[],
    page: number,
    limit: number
): Report[] => {
    return reports.slice(page * limit, page * limit + limit);
};

const ReportsTable: FC<ReportTableProps> = ({ reports, reloadReports: reloadReports }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handlePageChange = (_event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(e.target.value));
    };

    const handleReportComplete = async (reportId: string): Promise<void> => {
        try {
            await client.post(`/admin/report?reportId=${reportId}`);

            reloadReports();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRedirectButton = (userId: string): void => {
        let url = `/user/${userId}`;

        Router.push(url);
    }

    const paginatedReports = applyPagination(reports, page, limit);

    return (
        <>
            <Card>
                <CardHeader
                    title="신고 목록"
                />
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>정보</TableCell>
                                <TableCell>사유</TableCell>
                                <TableCell align="right">바로가기</TableCell>
                                <TableCell align="right">상태</TableCell>
                                <TableCell align="right">처리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedReports.map((report) => {
                                return (
                                    <TableRow
                                        hover
                                        key={report.id}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                대상: {report.targetId}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                            >
                                                신고자: {report.reportUserName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {report.message}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    handleRedirectButton(report.targetId);
                                                }}>
                                                바로가기
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            {getProcessLabel(report.process)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                report.process === 'pending' &&
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => {
                                                            handleReportComplete(report.id);
                                                        }}>
                                                        완료
                                                    </Button>
                                                </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box p={2}>
                    <TablePagination
                        component="div"
                        count={reports.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Box>
            </Card>
        </>
    );
};

ReportsTable.propTypes = {
    reports: PropTypes.array.isRequired
};

ReportsTable.defaultProps = {
    reports: []
};

export default ReportsTable;