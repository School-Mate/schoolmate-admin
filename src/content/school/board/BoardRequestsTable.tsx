import { BoardRequest, Process } from "@/models/boardRequest";
import { client } from "@/utils/client";
import { Box, Button, Card, CardHeader, Checkbox, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, useTheme } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import BoardRequestBulkActions from "./BoardRequestBulkActions";
import PropTypes from "prop-types";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import Router from "next/router";

interface BoardRequestsTableProps {
    className?: string;
    boardRequests: BoardRequest[];
}

const applyPagination = (
    boardRequests: BoardRequest[],
    page: number,
    limit: number
): BoardRequest[] => {
    return boardRequests.slice(page * limit, page * limit + limit);
};

const BoardRequestsTable: FC<BoardRequestsTableProps> = ({ boardRequests }) => {
    const [selectedBoardRequests, setSelectedBoardRequests] = useState<string[]>([]);
    const selectedBulkActions = selectedBoardRequests.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handleSelectAllBoardRequests = (event: ChangeEvent<HTMLInputElement>): void => {
        setSelectedBoardRequests(event.target.checked
            ? boardRequests.map((boardRequest) => boardRequest.id)
            : []);
    };

    const handleSelectOneVerifyRequest = (
        _event: ChangeEvent<HTMLInputElement>,
        requestId: string
    ): void => {
        if (!selectedBoardRequests.includes(requestId)) {
            setSelectedBoardRequests((prevSelected) => [...prevSelected, requestId]);
        } else {
            setSelectedBoardRequests((prevSelected) =>
                prevSelected.filter((id) => id !== requestId)
            );
        }
    }

    const handlePageChange = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const handleBoardRequest = (requestId: string, process: Process): void => {
        client.post('/admin/board', { requestId: requestId, process: process, message: '처리되었습니다.' });
    }

    const handleRedirectButton = (userId: string): void => {
        Router.push(`/user/${userId}`);
    }

    const paginatedBoardRequests = applyPagination(boardRequests, page, limit);
    const selectedSomeVerifyRequests = selectedBoardRequests.length > 0 && selectedBoardRequests.length < boardRequests.length;
    const selectedAllVerifyRequests = selectedBoardRequests.length === boardRequests.length;
    const theme = useTheme();

    boardRequests[0]

    return (
        <>
            <Card>
                {selectedBulkActions && (
                    <Box flex={1} p={2}>
                        <BoardRequestBulkActions />
                    </Box>
                )}
                {!selectedBulkActions && (
                    <CardHeader
                        title="게시판 요청 목록"
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
                                        onChange={handleSelectAllBoardRequests}
                                    />
                                </TableCell>
                                <TableCell>정보</TableCell>
                                <TableCell>개설 목적</TableCell>
                                <TableCell align="right">신청 유저</TableCell>
                                <TableCell align="right">처리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedBoardRequests.map((boardRequest) => {
                                const isBoardRequestSelected = selectedBoardRequests.includes(boardRequest.id);
                                return (
                                    <TableRow
                                        hover
                                        key={boardRequest.id}
                                        selected={isBoardRequestSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isBoardRequestSelected}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleSelectOneVerifyRequest(event, boardRequest.id)}
                                                value={isBoardRequestSelected}
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
                                                {boardRequest.schoolName} | {boardRequest.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                            >
                                                {boardRequest.description}
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
                                                {boardRequest.detail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    handleRedirectButton(boardRequest.userId);
                                                }}
                                            >
                                                바로가기
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
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
                                                    onClick={() => handleBoardRequest(boardRequest.id, Process.success)}
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
                                                    onClick={() => handleBoardRequest(boardRequest.id, Process.denied)}
                                                >
                                                    <DoNotDisturbAltOutlinedIcon fontSize="medium" />
                                                </IconButton>
                                            </Tooltip>
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
                        count={boardRequests.length}
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

BoardRequestsTable.propTypes = {
    boardRequests: PropTypes.array.isRequired
};

BoardRequestsTable.defaultProps = {
    boardRequests: []
};

export default BoardRequestsTable;