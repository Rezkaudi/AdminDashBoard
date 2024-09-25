"use client"
// Import necessary modules
import { useRouter } from 'next/navigation'; // Corrected import
import useAuth from '@/utils/useAuth'; // Ensure this path is correct
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Define the logout component
const LogoutPage = () => {

    const router = useRouter();
    const { logout } = useAuth();

    // Effectively handle the logout process
    useEffect(() => {
        const executeLogout = async () => {
            await logout();
            router.push('/');
            toast.success("log out successfully")
        };

        executeLogout();
    }, []);

    // Return null or a loading indicator while logging out
    return (
        <>
            logout ...
        </>
    ); // Consider adding a loading spinner or message
};

// Export the component wrapped in dynamic for client-side rendering
export default dynamic(() => Promise.resolve(LogoutPage), { ssr: false });