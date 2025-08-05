import DecodeToken from '../services/decodeToken';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
type Employee = {
  name: string
  leaveQuota: number;
};
type EmployeeLeaveRequests = {
  id: number;
  fromDate :string
  toDate :string
  duration :number
  note:string;
  status:string;
  createdAt :string;
};
const EmployeeDashboard =() =>{
    const API_URL = process.env.REACT_APP_API_URL;
    var token = localStorage.getItem("accessToken");
    var userId:number | null = null;
    if(token) {
      var decodedToken = DecodeToken(token)
      if (decodedToken){
        const userIdClaimKey = Object.keys(decodedToken).find(k=>k.endsWith('sub'))
        userId = userIdClaimKey ? (decodedToken as any)[userIdClaimKey] : null; // "as any" here because ClaimKeys are dynamic
      }  
    }
    const [employeeData, setEmployeeData] = useState<Employee>();    
    const [loading, setLoading] = useState(false);
    const [employeeLeaveRequests, setEmployeeLeaveRequests] = useState<EmployeeLeaveRequests[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [toDate, setToDate] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const handleSubmitLeave = async (e :React.FormEvent)=>{
      e.preventDefault()
      setLoading(true);
      setError(null);
      setSuccess(null)
      const res = await fetch(`${API_URL}/api/submit-leave-request/${userId}`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          fromDate, toDate, note
        })
    });
        const data = await res.json();
        if(res.ok){
          setSuccess(data.message);
          setTimeout(() => {
        }, 100);
        handleCloseModal();
        }
      else{
        setError(data.message || "Something went wrong");
      }
      loadData();
    }
    const loadData = useCallback(
      async () => {
        setLoading(true);
        const id = userId; 
        try{
          const[employeeRes, employeeLeaveRequestsRes] = await Promise.all([
            await fetch(`${API_URL}/api/get-my-details/${id}`,{
              method: "GET",
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }}),
            await fetch(`${API_URL}/api/employee-view-leave-requests/${id}`,{
              method: "GET",
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }})   
          ])
          const employees : Employee = await employeeRes.json();
          const allLeaveRequests: EmployeeLeaveRequests[] = await employeeLeaveRequestsRes.json(); //declear allLeaves as array of LeaveRequest     
          setEmployeeData(employees);
          setEmployeeLeaveRequests(allLeaveRequests) 
        }
        catch(error){
          console.error(error);
        }
        finally{
          setLoading(false);
        }
      },[API_URL, token,userId]);
      useEffect(() => {
        loadData();
      },[loadData]);  
    const handleCloseModal = ()=>{
      setFromDate('');
      setNote('');
      setToDate('')
      setError(null);
      setSuccess(null);
      setShowModal(false)
    }
  
    // Token stored in localStorage, extract Id from token, take that Id to find the data, and also to find the leaveRequest that employee has submitted.
    return (
        <div className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Welcome {employeeData?.name} to Employee Dashboard</h1>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/");
              }}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Logout
            </button>
          </div>
      
          {/* Submit Request Button */}
          <div className="mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + New Leave Request
            </button>
          </div>
      
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border">Start Date</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">Duration (Days)</th>
                  <th className="p-2 border">Reason</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeLeaveRequests.map((lr) => (
                  <tr key={lr.id}>
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
      
          {/* Modal for New Leave Request */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Submit Leave Request</h2>
      
                {/* You can use your controlled form or Formik here */}
                <form onSubmit={handleSubmitLeave}>
                  <div className="mb-2">
                    <label className="block mb-1">From Date</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>
      
                  <div className="mb-2">
                    <label className="block mb-1">To Date</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>
      
                  <div className="mb-2">
                    <label className="block mb-1">Reason</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                      rows={3}
                      required
                    />
                  </div>
      
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                      <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? 'Submitting...' : 'Submit Leave Request'}
          </button>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded p-2">
              {success}
            </div>
          )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
      
}
export default EmployeeDashboard;