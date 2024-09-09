import { useEffect, useState } from "react";
import { DashboardTable } from "@/components/DashboardTable";
import Header from "@/components/Header";
import { Reservation } from "@/interfaces/reservation.interface";
import { fetchReservations } from "@/services/api";

import resMock from "@/mocks/reservations.json";

const Dashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getReservations();
  }, [])

  const getReservations = async () => {
    setLoading(true)
    try {
      const reservations = await new Promise((resolve) => {
        setTimeout(() => resolve(resMock), 500);
      });
      // const reservations = await fetchReservations()
      console.log(reservations)
      setReservations(resMock)
    } catch (error) {
      throw new Error('Error fetching reservations')
    } finally {
      setLoading(false)
    }
  }



  return (
    <>
      <Header />
      <DashboardTable loading={loading} data={reservations} />
    </>
  )

}

export default Dashboard;