import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { redirectTo } = ctx.query;

    return {
        props: {
            redirectTo: redirectTo || "/",
        },
    };
};

interface LoginProps {
    redirectTo: string;
}

const Login: NextPage<LoginProps> = ({ redirectTo }) => {
    const [popup, setPopup] = useState<Window | null>();
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
}