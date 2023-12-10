import { Box, Button, Card, Container, Dialog, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import { FC, useState } from "react";
import PropTypes from 'prop-types';
import Router from "next/router";
import { client } from "@/utils/client";
import { School } from "schoolmate-types";

interface AllSchoolTableProps {
    allSchools: School[];
}

const applyPagination = (schools: School[], page: number, limit: number) => {
    return schools.slice(page * limit, page * limit + limit);
}

const AllSchoolsTable: FC<AllSchoolTableProps> = ({ allSchools: allSchools }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value));
    }

    const handleNameButton = async (schoolId: string, name: string) => {
        try {
            await client.post(`/admin/${schoolId}/name`, { name: name });

        } catch (error) {
            console.log(error);
        }
    }

    const paginatedAllSchools = applyPagination(allSchools, page, limit);

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
                                        // onClick={() => handleContentOpen(school)}
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