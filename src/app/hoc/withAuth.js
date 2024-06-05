import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import cache from "@/app/services/cache";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (!cache.get('token')) {
                router.push('/login');
            }
        }, [router]);

        return cache.get('token') ? <WrappedComponent {...props} /> : null;
    };

    AuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
    return AuthComponent;
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAuth;
