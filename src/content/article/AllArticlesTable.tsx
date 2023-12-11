import { Box, Button, Card, Container, Dialog, Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { FC, useState } from "react";
import { ArticleWithUser } from "types/article";
import PropTypes from 'prop-types';
import Router from "next/router";
import { client } from "@/utils/client";

interface AllArticlesTableProps {
    allArticles: ArticleWithUser[];
    reloadArticles: () => void;
}

const applyPagination = (articles: ArticleWithUser[], page: number, limit: number) => {
    return articles.slice(page * limit, page * limit + limit);
}

const AllArticlesTable: FC<AllArticlesTableProps> = ({ allArticles, reloadArticles }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [targetImages, setTargetImages] = useState<Array<string>>([]);
    const [targetContent, setTargetContent] = useState<ArticleWithUser>();
    const [imageOpen, setImageOpen] = useState(false);
    const [contentOpen, setContentOpen] = useState(false);

    const handleImageOpen = (images: Array<string>) => {
        setTargetImages(images);
        setImageOpen(true);
    }

    const handleContentOpen = (article: ArticleWithUser) => {
        setTargetContent(article);
        setContentOpen(true);
    }

    const handleImageClose = () => {
        setImageOpen(false);
    }

    const handleContentClose = () => {
        setContentOpen(false);
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

    const handleDeleteButton = async (boardId: number, articleId: number) => {
        try {
            await client.delete(`/admin/board/${boardId}/article/${articleId}`);
            reloadArticles();
        } catch (error) {
            console.log(error);
        }
    }

    const paginatedAllArticles = applyPagination(allArticles, page, limit);

    const ImageDialog = (props) => {
        const { onClose, images, open } = props;
        const handleClose = () => {
            onClose();
        }

        return (
            <Dialog onClose={handleClose} open={open}>
                <Container>
                    <Box>
                        {
                            images ?
                                images.map((image) => (
                                    <img src={process.env.NEXT_PUBLIC_API_URL + '/' + image} />
                                )) : (<h1>이미지 없음</h1>)
                        }
                    </Box>
                </Container>
            </Dialog>
        )
    }

    const ContentDialog = (props) => {
        const { onClose, content, open } = props;
        const handleClose = () => {
            onClose();
        }

        return (
            <Dialog onClose={handleClose} open={open}>
                <Container>
                    <Box>
                        <h1>{content?.title}</h1>
                        <p>{content?.content}</p>
                    </Box>
                </Container>
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
                                <TableCell>게시판</TableCell>
                                <TableCell>작성자</TableCell>
                                <TableCell align="right">내용</TableCell>
                                <TableCell align="right">이미지</TableCell>
                                <TableCell align="right">삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAllArticles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell>
                                        <Link
                                            color="inherit"
                                            href={`/article/${article.id}`}
                                            underline="none"
                                            variant="body2"
                                        >
                                            {article.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {article.schoolId}-{article.board.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleRedirectButton(article.user.id)}>
                                            {article.user.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleContentOpen(article)}>
                                            내용
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleImageOpen(article.images)}>
                                            이미지
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteButton(article.board.id, article.id)}
                                        >
                                            삭제
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
                        count={allArticles.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Box>
            </Card>

            <ImageDialog
                open={imageOpen}
                onClose={handleImageClose}
                image={targetImages}
            />

            <ContentDialog
                open={contentOpen}
                onClose={handleContentClose}
                content={targetContent}
            />
        </>
    )
}

AllArticlesTable.propTypes = {
    allArticles: PropTypes.array.isRequired
}

AllArticlesTable.defaultProps = {
    allArticles: []
}

export default AllArticlesTable;