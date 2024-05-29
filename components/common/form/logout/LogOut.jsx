"use client"

import useToken from "@/utils/useToken"
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';

const LogOut = () => {
    const { removeToken } = useToken()
    const router = useRouter();

    const handleLogout = () => {
        removeToken()
        router.push('/login');
        toast.success("log out successfully")
    };

    return (
        <button className="theme-btn btn-style-one mm-listitem__text" onClick={handleLogout}>
            LogOut
        </button>
    )
}

export default LogOut