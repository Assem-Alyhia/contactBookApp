import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthGuard = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = cookies.get('authToken');
        if (!token) {
            router.push('/auth/signIn'); // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
        }
    }, [router]);

    const token = cookies.get('authToken');
    if (!token) {
        return null; // أو يمكنك عرض عنصر تحميل أو رسالة للمستخدم
    }

    return <>{children}</>;
};

export default AuthGuard;
