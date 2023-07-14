import { Process } from "@/models/report";
import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import ReportsTable from "./ReportTable";

interface ReportsProps {
    process: Process;
}

const Reports: React.FC<ReportsProps> = ({ process }) => {
    const { data: reportdatas } = useSWR<Report[]>(`/admin/report?process=${process}`, swrFetcher);

    return (
        <Card>
            {reportdatas ?
                <ReportsTable reports={reportdatas} /> : (<></>)
            }
        </Card>
    )
}



export default Reports;