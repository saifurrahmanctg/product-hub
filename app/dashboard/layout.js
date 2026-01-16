
import DashboardLayout from '@/components/DashboardLayout';

export const metadata = {
    title: 'Dashboard | ProductHub',
    description: 'Manage your listings and orders.',
};

export default function Layout({ children }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
