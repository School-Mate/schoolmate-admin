import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import ReportsTable from "./ReportTable";
import { Report, Process } from "schoolmate-types"

interface ReportsProps {
    process: Process;
}

const Reports: React.FC<ReportsProps> = ({ process }) => {
    const { data: reportdatas, mutate: reloadReports } = useSWR<Report[]>(`/admin/report?process=${process}&targetType=user`, swrFetcher);

    return (
        <Card>
            {reportdatas ?
                <ReportsTable reports={reportdatas} reloadReports={reloadReports} /> : (<></>)
            }
        </Card>
    )
}



export default Reports;