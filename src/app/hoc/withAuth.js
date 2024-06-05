import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import cache from "@/app/services/cache";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            if (!cache.get('token')) {
                router.push('/login');
            }
        }, []);

        return cache.get('token') ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
