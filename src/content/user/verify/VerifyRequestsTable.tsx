import { VerifyRequest } from "@/models/verifyRequest";
import { Box, Button, Card, CardHeader, Checkbox, Dialog, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, useTheme } from "@mui/material";
import React, { ChangeEvent, FC, useState, } from "react";
import RequestBulkActions from "./RequestBulkActions";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Process } from "@/models/verifyRequest";
import Label from "@/components/Label";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { client } from "@/utils/client";

const getProcessLabel = (verifyRequestProcess: Process): JSX.Element => {
    const statusMaps = {
        denied: {
            text: '거부됨',
            color: 'error'
        },
        success: {
            text: '승인됨',
            color: 'success'
        },
        pending: {
            text: '대기 중',
            color: 'warning'
        },
    };

    const { text, color }: any = statusMaps[verifyRequestProcess];

    return <Label color={color}>{text}</Label>;
};

interface VerifyRequestsTableProps {
    className?: string;
    verifyRequests: VerifyRequest[];
    reloadVerfiyRequests: () => void;
}

interface Filters {
    process?: Process;
}

const applyPagination = (
    verifyRequests: VerifyRequest[],
    page: number,
    limit: number
): VerifyRequest[] => {
    return verifyRequests.slice(page * limit, page * limit + limit);
};

const applyFilters = (
    verifyRequests: VerifyRequest[],
    filters: Filters
): VerifyRequest[] => {
    return verifyRequests.filter((verifyRequest) => {
        let matches = true;

        if (filters.process && verifyRequest.process !== filters.process) {
            matches = false;
        }

        return matches;
    });
};

const ImageDialog = (props) => {
    const { onClose, image, open } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <img src={process.env.NEXT_PUBLIC_S3_URL + '/' + image} />
        </Dialog>
    )
}

const VerifyRequestsTable: FC<VerifyRequestsTableProps> = ({ verifyRequests, reloadVerfiyRequests }) => {
    const [selectedVerifyRequests, setSelectedVerifyRequests] = useState<string[]>([]);
    const selectedBulkActions = selectedVerifyRequests.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [targetImage, setTargetImage] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({
        process: null
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = (image: string) => {
        setTargetImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const statusOptions = [
        {
            id: 'all',
            name: '전체'
        },
        {
            id: 'success',
            name: '승인됨'
        },
        {
            id: 'denied',
            name: '거부됨'
        },
        {
            id: 'pending',
            name: '대기 중'
        }
    ];

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'all') {
            value = e.target.value;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            process: value
        }));
    };

    const handleSelectAllVerifyRequests = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedVerifyRequests(
            event.target.checked ? verifyRequests.map((verifyRequest) => verifyRequest.userId) : []
        );
    };

    const handleSelectOneVerifyRequest = (
        _event: ChangeEvent<HTMLInputElement>,
        userId: string
    ): void => {
        if (!selectedVerifyRequests.includes(userId)) {
            setSelectedVerifyRequests((prevSelected) => [...prevSelected, userId]);
        } else {
            setSelectedVerifyRequests((prevSelected) =>
                prevSelected.filter((id) => id !== userId)
            );
        }
    };

    const handlePageChange = (_event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const handleVerifyRequest = async (userId: string, message: string, process: Process) => {
        try {
            await client.post('/admin/verify', { requestId: userId, message: message, process: process });

            reloadVerfiyRequests()
        } catch {
            alert('오류가 발생했습니다.');
        }
    }

    const filteredVerifyRequests = applyFilters(verifyRequests, filters);
    const paginatedVerifyRequests = applyPagination(filteredVerifyRequests, page, limit);
    const selectedSomeVerifyRequests =
        selectedVerifyRequests.length > 0 &&
        selectedVerifyRequests.length < verifyRequests.length;
    const selectedAllVerifyRequests =
        selectedVerifyRequests.length === verifyRequests.length;
    const theme = useTheme();

    verifyRequests[0]

    return (
        <>
            <Card>
                {selectedBulkActions && (
                    <Box flex={1} p={2}>
                        <RequestBulkActions />
                    </Box>
                )}
                {!selectedBulkActions && (
                    <CardHeader
                        action={
                            <Box width={150}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>상태</InputLabel>
                                    <Select
                                        value={filters.process || 'all'}
                                        onChange={handleFilterChange}
                                        label="Status"
                                        autoWidth
                                    >
                                        {statusOptions.map((statusOption) => (
                                            <MenuItem key={statusOption.id} value={statusOption.id}>
                                                {statusOption.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        }
                        title='요청 목록'
                    />
                )}
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={selectedAllVerifyRequests}
                                        indeterminate={selectedSomeVerifyRequests}
                                        onChange={handleSelectAllVerifyRequests}
                                    />
                                </TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>정보</TableCell>
                                <TableCell>이미지</TableCell>
                                <TableCell align="right">신청 일자</TableCell>
                                <TableCell align="right">상태</TableCell>
                                <TableCell align="right">처리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedVerifyRequests.map((verifyRequest) => {
                                const isVerifyRequestSelected = selectedVerifyRequests.includes(verifyRequest.userId);
                                return (
                                    <TableRow
                                        hover
                                        key={verifyRequest.userId}
                                        selected={isVerifyRequestSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isVerifyRequestSelected}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleSelectOneVerifyRequest(event, verifyRequest.userId)
                                                }
                                                value={isVerifyRequestSelected}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {verifyRequest.userName}
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
                                                {verifyRequest.schoolName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                            >
                                                {verifyRequest.grade}학년 {verifyRequest.class}반
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    handleClickOpen(verifyRequest.image.key);
                                                }}>
                                                이미지 확인
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body1"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {dayjs(verifyRequest.createdAt).format('YYYY/MM/DD HH:mm')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {getProcessLabel(verifyRequest.process)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                verifyRequest.process === 'pending' &&
                                                <>
                                                    <Tooltip title="승인" arrow>
                                                        <IconButton
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: theme.colors.success.lighter
                                                                },
                                                                color: theme.colors.success.main
                                                            }}
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                handleVerifyRequest(verifyRequest.id, "승인되었습니다.", Process.success);
                                                            }}
                                                        >
                                                            <CheckCircleOutlineOutlinedIcon fontSize="medium" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="거부" arrow>
                                                        <IconButton
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: theme.colors.error.lighter
                                                                },
                                                                color: theme.colors.error.main
                                                            }}
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                handleVerifyRequest(verifyRequest.id, "거부되었습니다.", Process.denied);
                                                            }}
                                                        >
                                                            <DoNotDisturbAltOutlinedIcon fontSize="medium" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box p={2}>
                    <TablePagination
                        component="div"
                        count={filteredVerifyRequests.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Box>
            </Card>

            <ImageDialog
                open={open}
                onClose={handleClose}
                image={targetImage}
            />
        </>
    );
};

VerifyRequestsTable.propTypes = {
    verifyRequests: PropTypes.array.isRequired
};

VerifyRequestsTable.defaultProps = {
    verifyRequests: []
};

export default VerifyRequestsTable;