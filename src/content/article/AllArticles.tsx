import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import { ArticleWithUser } from "types/article";
import AllArticlesTable from "./AllArticlesTable";

const AllArticles: React.FC = () => {
    const { data: allArticles, mutate: reloadArticles } = useSWR<ArticleWithUser[]>(`/admin/article/all`, swrFetcher);

    return (
        <Card>
            {allArticles ?
                <AllArticlesTable allArticles={allArticles} reloadArticles={reloadArticles} /> : (<></>)
            }
        </Card>
    )
}

export default AllArticles;