import { User } from "@/models/user";
import { swrFetcher } from "@/utils/client";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import Status404 from "pages/404";
import useSWR from "swr";

interface InfoProps {
    userId: string;
}

const Info: React.FC<InfoProps> = ({ userId: info }) => {
    const { data: userInfo } = useSWR<User>(`/admin/user/${info}`, swrFetcher);
    if (!userInfo) {
        return <Status404 />;
    }

    return (
        <Card>
            <Grid spacing={0} container>
                <Grid item xs={12} sm={6}>
                    <Box p={4}>
                        <Typography
                            sx={{
                                pb: 3
                            }}
                            variant="h4"
                        >
                            유저 정보
                        </Typography>
                        <Box>
                            <Grid direction="row" container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" gutterBottom>
                                        {userInfo.name}
                                    </Typography>
                                    <Avatar
                                        sx={{
                                            mr: 2,
                                            width: 200,
                                            height: 200
                                        }}
                                        variant="rounded"
                                        alt={userInfo.name}
                                        src={
                                            userInfo.profile ?
                                                process.env.NEXT_PUBLIC_S3_URL + '/' + userInfo.profile :
                                                "https://media.discordapp.net/attachments/1123544235992416292/1130140456374780025/1.png?width=880&height=880"
                                        }
                                    />
                                </Grid>
                                <Grid item lg={8} xs={12}>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        ID: {userInfo.id}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        이메일: {userInfo.email ? userInfo.email : "미등록"}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        전화번호: {userInfo.phone ? userInfo.phone : "미등록"}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        가입일: {dayjs(userInfo.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        로그인: {userInfo.provider}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="normal"
                                        color="text.secondary"
                                    >
                                        학교ID: {userInfo.userSchoolId ? userInfo.userSchoolId : "인증되지 않음"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Info;