import { client } from "@/utils/client";
import { Button, Card, CardHeader, Container, TextField } from "@mui/material";
import { NextPage } from "next";
import Router from 'next/router';
import { useState } from "react";

interface LoginProps {
    redirectTo: string;
}

const Login: NextPage<LoginProps> = ({ redirectTo }) => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = (id, password) => {
        client.post('/admin/login', { id: id, password: password });
        Router.push('/admin');
    }

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