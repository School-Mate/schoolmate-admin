import { FC, useState } from "react";
import PropTypes from 'prop-types';
import { Box, Button, Card, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import { UserWithSchool } from "types/user";
import Router from "next/router";

interface AllUsersTableProps {
    allUsers: UserWithSchool[];
}

const applyPagination = (users: UserWithSchool[], page: number, limit: number) => {
    return users.slice(page * limit, page * limit + limit);
}

const AllUsersTable: FC<AllUsersTableProps> = ({ allUsers }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [targetImage, setTargetImage] = useState<string>('');
    const [open, setOpen] = useState(false);

    const handleOpen = (image: string) => {
        setTargetImage(image);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value));
    }

    const handleRedirectButton = (userId: string) => {
        let url = `/user/${userId}`;
        Router.push(url);
    }

    const paginatedAllUsers = applyPagination(allUsers, page, limit);
    const theme = useTheme();

    const ImageDialog = (props) => {
        const { onClose, image, open } = props;
        const handleClose = () => {
            onClose();
        }

        return (
            <Dialog onClose={handleClose} open={open}>
                <img src={process.env.NEXT_PUBLIC_API_URL + '/' + image} />
            </Dialog>
        )
    }

    return (
        <>
            <Card>
                {<TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>이름</TableCell>
                                <TableCell>학교</TableCell>
                                <TableCell>학년</TableCell>
                                <TableCell align="right">이메일</TableCell>
                                <TableCell align="right">전화번호</TableCell>
                                <TableCell align="right">프로필</TableCell>
                                <TableCell align="right">관리</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAllUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            user.userSchool ?
                                                `${user.userSchool.school.defaultName}/${user.userSchool.dept}` :
                                                <span style={{ color: theme.palette.error.main }}>학교 정보 없음</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            user.userSchool ?
                                                `${user.userSchool.grade}-${user.userSchool.class}` :
                                                <span style={{ color: theme.palette.error.main }}>학교 정보 없음</span>
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.phone}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleOpen(user.profile)}>
                                            프로필
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleRedirectButton(user.id)}>
                                            관리
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
                <Box p={2}>
                    <TablePagination
                        component="div"
                        count={allUsers.length}
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
    )
}

AllUsersTable.propTypes = {
    allUsers: PropTypes.array.isRequired
}

AllUsersTable.defaultProps = {
    allUsers: []
}

export default AllUsersTable;