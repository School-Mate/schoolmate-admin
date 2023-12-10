import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import { School } from "schoolmate-types";
import useSWR from "swr";
import AllSchoolsTable from "./AllSchoolsTable";

const AllSchools: React.FC = () => {
    const { data: allSchools } = useSWR<School[]>(`/admin/school/all`, swrFetcher);

    return (
        <Card>
            {allSchools ?
                <AllSchoolsTable allSchools={allSchools} /> : (<></>)
            }
        </Card>
    )
}

export default AllSchools;