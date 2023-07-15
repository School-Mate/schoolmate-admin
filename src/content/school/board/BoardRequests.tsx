import { BoardRequest, Process } from "@/models/boardRequest";
import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import BoardRequestsTable from "./BoardRequestsTable";

interface BoardRequestsProps {
    process: Process;
}

const BoardRequests: React.FC<BoardRequestsProps> = ({ process }) => {
    const { data: boardRequestdatas } = useSWR<BoardRequest[]>(`/admin/board?process=${process}`, swrFetcher);

    return (
        <Card>
            {
                boardRequestdatas ?
                    <BoardRequestsTable boardRequests={boardRequestdatas} /> : (<></>)
            }
        </Card>
    )
}

export default BoardRequests;