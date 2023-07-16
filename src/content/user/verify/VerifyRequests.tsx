import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import VerifyRequestsTable from "./VerifyRequestsTable";
import { Process, VerifyRequest } from "@/models/verifyRequest";

interface VerifyRequestsProps {
    process: Process;
}

const VerifyRequests: React.FC<VerifyRequestsProps> = ({ process }) => {
    const { data: verifyRequestdatas, mutate: reloadVerfiy } = useSWR<VerifyRequest[]>(`/admin/verify?process=${process}`, swrFetcher);


    return (
        <Card>
            {verifyRequestdatas ?
                <VerifyRequestsTable verifyRequests={verifyRequestdatas} reloadVerifyRequests={reloadVerfiy} /> : (<></>)
            }
        </Card>
    )
}

export default VerifyRequests;