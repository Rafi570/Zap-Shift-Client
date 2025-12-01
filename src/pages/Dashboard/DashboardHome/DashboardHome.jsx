import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import PaymentHistory from '../PaymentHistory/PaymentHistory';

const DashboardHome = () => {
 const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'rider') {
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else {
        return <PaymentHistory></PaymentHistory>
    }
};

export default DashboardHome;