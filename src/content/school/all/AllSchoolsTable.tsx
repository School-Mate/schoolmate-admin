import { Box, Button, Card, Container, Dialog, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import { FC, useState } from "react";
import PropTypes from 'prop-types';
import Router from "next/router";
import { client } from "@/utils/client";
import { School } from "schoolmate-types";
import { Input } from '@mui/material';

interface AllSchoolTableProps {
    allSchools: School[];
}

interface NameDialogProps {
    onClose: () => void;
    open: boolean;
    school: School;
}

const applyPagination = (schools: School[], page: number, limit: number) => {
    return schools.slice(page * limit, page * limit + limit);
}

const AllSchoolsTable: FC<AllSchoolTableProps> = ({ allSchools: allSchools }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [targetSchool, setTargetSchool] = useState<School>();
    const [nameOpen, setNameOpen] = useState(false);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value));
    }

    const paginatedAllSchools = applyPagination(allSchools, page, limit);

    const handleNameOpen = (school: School) => {
        setTargetSchool(school);
        setNameOpen(true);
    }

    const handleNameClose = () => {
        setNameOpen(false);
    }

    const NameDialog = (props: NameDialogProps) => {
        const { onClose, open, school } = props;
        if (!school) return (<></>);
        const [newName, setNewName] = useState(school.name);

        const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewName(event.target.value);
        }

        const handleNameClose = () => {
            onClose();
        }

        const handleNameSubmit = async () => {
            try {
                await client.post(`/admin/${school.schoolId}/name`, { name: newName });
                onClose();
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <Dialog
                onClose={handleNameClose}
                open={open}
            >
                <Box p={2}>
                    <h2>학교명 설정</h2>
                    <p>학교명을 설정합니다.</p>
                    <Box p={2}>
                        <Input
                            onChange={handleNameChange}
                            placeholder={school.defaultName}
                            type="text"
                            value={newName}
                        />
                    </Box>
                    <Box p={2}>
                        <Button
                            onClick={handleNameSubmit}
                            variant="outlined"
                        >
                            학교명 설정
                        </Button>
                    </Box>
                </Box>
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
                                <TableCell>id</TableCell>
                                <TableCell>학교명</TableCell>
                                <TableCell>종류</TableCell>
                                <TableCell align="right">학교명 설정</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAllSchools.map((school) => (
                                <TableRow key={school.schoolId}>
                                    <TableCell>
                                        {school.schoolId}
                                    </TableCell>
                                    <TableCell>
                                        {school.defaultName}{
                                            school.name ? `/${school.name}` : ""
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {school.type}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleNameOpen(school)}
                                        >
                                            학교명 설정
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
                        count={allSchools.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Box>
            </Card>

            <NameDialog
                open={nameOpen}
                onClose={handleNameClose}
                school={targetSchool}
            />
        </>
    )
}

AllSchoolsTable.propTypes = {
    allSchools: PropTypes.array.isRequired
}

AllSchoolsTable.defaultProps = {
    allSchools: []
}

export default AllSchoolsTable;