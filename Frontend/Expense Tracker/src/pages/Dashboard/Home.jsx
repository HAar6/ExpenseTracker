import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeperator } from '../../utils/helper';
import RecentTransactions from '../../components/dashboard/RecentTransactions';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions';
const Home = () => {
  useUserAuth();  

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if(response.data){
        setDashboardData(response.data);
      }

    } catch(error){
      console.log("Something Went Wrong",error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {
    }
  }, [])
  
  return (
   <DashboardLayout activeMenu="Dashboard">
    <div className='mu-5 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
          color='bg-primary'
         />

         <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income" 
          value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
          color='bg-orange-500'
         />

         <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expenses"
          value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
          color='bg-red-500'
         />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
          />

          <ExpenseTransactions
                transactions={dashboardData?.last60DaysExpenses?.transactions || []}
                onSeeMore={()=>navigate("/expense")}
                />

          {/* <Last60DaysExpenses
                data = {dashboardData?.last60DaysExpenses?.transactions || []}
                /> */}
      </div>
    </div>
   </DashboardLayout>
  );
};

export default Home