"use client";

import styles from "./home.module.scss";
import { SideBar } from "../../components/sidebar/sidebar";
import { DialogMessage } from "@/app/components/dialog/dialog-message";

import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import dynamic from "next/dynamic";
import { Path } from "@/app/constants";

import { useAppConfig } from "../../store/config";
import { useAccessStore } from "@/app/store/access";

const Chat = dynamic(async () => (await import("../chat/chat")).Chat);
const Auth = dynamic(async () => (await import("../auth/auth")).Auth);
const Market = dynamic(async () => (await import("../market/market")).Market);

function Screen() {
    const config = useAppConfig();
    const access = useAccessStore();
    const location = useLocation();
    const isAuthPath = location.pathname === '/auth';
    const isAuthorized = access.isAuthorized()
    return (
        <div
            className={`${
                config.tightBorder ? styles["tight-container"] : styles.container
            }`}
        >
            {isAuthPath || !isAuthorized ? (
                <Auth />
            ) : (
                <>
                    {/* 工具菜单 */}
                    <SideBar />

                    {/* 路由地址 */}
                    <div className={styles["window-content"]}>
                        <Routes>
                            <Route path={Path.Home} element={<Chat />} />
                            <Route path={Path.Chat} element={<Chat />}>
                                <Route path=":id" element={<DialogMessage />} />
                            </Route>
                            <Route path={Path.Market} element={<Market/>}/>
                        </Routes>
                    </div>
                </>
            )}
        </div>
    );
}

export function Home() {
    return (
        <Router>
            <Screen />
        </Router>
    );
}
