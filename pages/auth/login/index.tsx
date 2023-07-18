import { client } from "@/utils/client";
import Toast from "@/utils/toast";
import { Button, Card, CardHeader, Container, TextField } from "@mui/material";
import { AxiosError } from "axios";
import Router from 'next/router';
import { useState } from "react";

const Login = () => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (id, password) => {
        try {
            await client.post('/admin/login', { id: id, password: password });
            Router.push('/user/verify');
        } catch (error) {
            if (error instanceof AxiosError) {
                Toast(error.response.data.message, 'error');
                return;
            } else {
                Toast("알 수 없는 오류가 발생했습니다.", 'error');
                return;
            }
        }
    };

    return (
        <>
            <Card style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Container maxWidth="sm" style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <CardHeader title="로그인" />
                    <TextField
                        required
                        type="text"
                        id="outlined-required"
                        label="아이디"
                        style={{
                            marginBottom: "10px"
                        }}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="비밀번호"
                        type="password"
                        autoComplete="current-password"
                        style={{
                            marginBottom: "10px"
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={() => {
                            handleLogin(id, password);
                        }}
                    >로그인</Button>
                </Container>
            </Card>
        </>
    )
}

export default Login;