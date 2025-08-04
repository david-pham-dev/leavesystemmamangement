import { User } from "lucide-react";
import { useState, useEffect, use } from "react";
import { redirect,useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
};

type LeaveRequest = {
  id: number;
  employeeName: string;
  fromDate: string;
  toDate: string;
  duration: number;
  note: string;
  status: string;
  submittedAt: string;
};

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<"users" | "pending" | "allLeaves">("users"); //users is the default view
  const [users, setUsers] = useState<User[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(false);
  var token = localStorage.getItem("accessToken");
  useEffect(() => {
    loadData();
  }, []);
  const handleApprove = async (userId : number) =>{
   const res = await fetch(`http://localhost:5131/api/handle-leave-request/${userId}/approve`,{
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
      if(!res.ok){
        console.log("Something is wrong while approving request")
      }
      loadData();
  }
  const handleReject = async (userId : number) =>{
    const res = await fetch(`http://localhost:5131/api/handle-leave-request/${userId}/reject`,{
       method: "POST",
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }})
       if(!res.ok){
         console.log("Something is wrong while rejecting request")
       }
       loadData();
   }
  const loadData = async () => {
    setLoading(true);   
    try{
      const[usersRes, leaveRes] = await Promise.all([
        await fetch("http://localhost:5131/api/get-all-employees",{
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}),
        await fetch("http://localhost:5131/api/view-leave-requests",{
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }})   
      ])
      const employees : User[] = await usersRes.json();
      const allLeaveRequests: LeaveRequest[] = await leaveRes.json(); //declear allLeaves as array of LeaveRequest     
      setUsers(employees);
      setLeaveRequests(allLeaveRequests)
      if(allLeaveRequests){
        const pendingLeaveRequests : LeaveRequest[] =  allLeaveRequests.filter(lr=> lr.status == "Pending");
        setPendingLeaveRequests(pendingLeaveRequests);
      }
      
      console.log("this is pending: ", pendingLeaveRequests)
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
              localStorage.removeItem("accessToken")
              navigate("/")
          }}
          className="px-3 py-1 bg-gray-800 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded ${view === "users" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setView("users")}
        >
          View All Employee
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "pending" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setView("pending")}
        >
          Pending Requests
        </button>

        <button
          className={`px-4 py-2 rounded ${view === "allLeaves" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setView("allLeaves")}
        >
          All Leave Requests
        </button>


      </div>

      {loading && <p>Loading...</p>}
     
      {/* Tables */}
      {!loading && view === "users" && (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="p-2 border">ID</th>
        <th className="p-2 border">Name</th>
        <th className="p-2 border">Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="p-2 border">{user.id}</td>
          <td className="p-2 border">{user.name}</td>
          <td className="p-2 border">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      {!loading && (view === "pending") && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="p-2 border">Employee Name</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Duration (Days)</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
             <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaveRequests.map((lr) => (
              <tr key={lr.id}>
                <td className="p-2 border">{lr.employeeName}</td>
                <td className="p-2 border">{lr.fromDate}</td>
                <td className="p-2 border">{lr.toDate}</td>
                <td className="p-2 border">{lr.duration}</td>
                <td className="p-2 border">{lr.note}</td>
                <td className="p-2 border">{lr.status}</td>
                  <td className="p-2 border">
                    <button
                       onClick={() => handleApprove(lr.id)}
                      className="px-2 py-1 bg-green-600 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                     onClick={() => handleReject(lr.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
       {!loading && (view === "allLeaves") && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="p-2 border">Employee Name</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Duration (Days)</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((lr) => (
              <tr key={lr.id}>
                <td className="p-2 border">{lr.employeeName}</td>
                <td className="p-2 border">{lr.fromDate}</td>
                <td className="p-2 border">{lr.toDate}</td>
                <td className="p-2 border">{lr.duration}</td>
                <td className="p-2 border">{lr.note}</td>
                <td className="p-2 border">{lr.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
