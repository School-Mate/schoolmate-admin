import { swrFetcher } from "@/utils/client";
import { Card } from "@mui/material";
import useSWR from "swr";
import AllUsersTable from "./AllUsersTable";
import { UserWithSchool } from "types/user";


const AllUsers: React.FC = () => {
    const { data: allUsers } = useSWR<UserWithSchool[]>(`/admin/user/all`, swrFetcher);

    return (
        <Card>
            {allUsers ?
                <AllUsersTable allUsers={allUsers} /> : (<></>)
            }
        </Card>
    )
}

export default AllUsers;