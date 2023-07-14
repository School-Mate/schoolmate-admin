import Label from "@/components/Label";
import { Process, Report, ReportTargetType } from "@/models/report"
import { client } from "@/utils/client";
import { useTheme } from "@emotion/react";
import { Box, Button, Card, CardHeader, Divider, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
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
}

interface Filters {
    process?: Process;
}

const applyPagination = (
    reports: Report[],
    page: number,
    limit: number
): Report[] => {
    return reports.slice(page * limit, page * limit + limit);
};

const applyFilters = (
    reports: Report[],
    filters: Filters
): Report[] => {
    return reports.filter((reports) => {
        let matches = true;

        if (filters.process && reports.process !== filters.process) {
            matches = false;
        }

        return matches;
    });
};

const handleRedirectButton = (report: Report): void => {
    let url = '';
    if (report.targetType === ReportTargetType.user) {
        url = ``;
    } else if (report.targetType === ReportTargetType.article) {
        url = ``;
    } else if (report.targetType === ReportTargetType.asked) {
        url = ``;
    } else if (report.targetType === ReportTargetType.comment) {
        url = ``;
    } else if (report.targetType === ReportTargetType.recomment) {
        url = ``;
    }

    Router.push(url);
}

const ReportsTable: FC<ReportTableProps> = ({ reports }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        process: null
    });

    const processOptions = [
        {
            id: 'all',
            name: '전체'
        },
        {
            id: 'success',
            name: '처리됨'
        },
        {
            id: 'pending',
            name: '처리 중'
        }
    ];

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            [e.target.name]: value
        }));
    }

    const handlePageChange = (_event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(e.target.value));
    };

    const handleReportComplete = (reportId: string): void => {
        client.post(`/admin/report?${reportId}`);
    };

    const filteredReports = applyFilters(reports, filters);
    const paginatedReports = applyPagination(filteredReports, page, limit);
    const theme = useTheme();

    reports[0]

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
                                                타입: {report.targetType} | 신고자: {report.reportUserName}
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
                                                    handleRedirectButton(report);
                                                }}>
                                                바로가기
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            {getProcessLabel(report.process)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    handleReportComplete(report.id);
                                                }}>
                                                완료
                                            </Button>
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
                        count={filteredReports.length}
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