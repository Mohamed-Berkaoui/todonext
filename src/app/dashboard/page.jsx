"use client";

import { useAuth } from "../(context)/UserContext";
import { useRouter } from "next/navigation";
import CustomCalendar from "../(components)/Calendar";
import "./dashboard.css";
import AddTask from "../(components)/AddTask";
import TasksList from "../(components)/TasksList";
import Navbar from "../(components)/Navbar";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  //   useEffect(() => {
  //     if (!user) {
  //       router.push("/user/login");
  //     }
  //   }, [user, router]);

  //   if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-left">
          <CustomCalendar />


        </div>

        <div className="dashboard-right">
        <AddTask />
        <TasksList />
        </div>
      </div>
    </>
  );
}
