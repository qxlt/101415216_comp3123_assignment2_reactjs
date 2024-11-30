import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom'
import api from './ApiConfig/ApiConfig'
import '../ListEmp.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function Search(){
    const [employees, setEmployees] = useState(null)
    const [loading, setLoading] = useState(true)
    const query = useQuery();
    const nameDisplay = (name) =>{
        return name.charAt(0).toUpperCase()+name.slice(1); 
    }

    const handleDetail = async(empId) =>{
        const eid = {eid: empId}
        const queryParams = new URLSearchParams(eid).toString();
        window.location.href = `/Detail?${queryParams}`
    }

    const handleDelete = async(empId) =>{
        const response = await api.delete(`/emp/employees?eid=${empId}`);
        if (response.data && response.data.message) {
            alert(response.data.message);
        } else {
            alert('Employee deleted successfully.');
            this.componentDidMount()
        }
    }

    useEffect(()=>{
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("/emp/search", {
                    params: {
                        fname: query.get("fname"),
                        lname: query.get("lname"),
                        email: query.get("email"),
                    },
                });
                if (response) {
                    setEmployees(response.data);
                    setLoading(false);
                }
            } catch (err) {
                alert(err.message);
                setLoading(false);
            }
        };
        fetchEmployees();
        
    }, [query])

    if(loading){
        return <h2>Loading...</h2>
    }

    if(!employees){
        return(
            <div className="container d-flex flex-column justify-content-center">
                <h3>No Result Found</h3>
                <Link to="/ListEmployee" className="btn btn-pink-400 w-25">Go Back</Link>
            </div>
        )
    }


    return(
        <div className="container">
        <table class="table table-striped pink-100">
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {employees.map((emp) => (
                <tr>
                    <td>{emp._id}</td>
                    <td>{nameDisplay(emp.first_name)}</td>
                    <td>{nameDisplay(emp.last_name)}</td>
                    <td>{emp.email}</td>
                    <td>
                        <button onClick={()=> handleDetail(emp._id)} className="btn btn-red-400" >Details</button>
                        <button onClick={() => handleDelete(emp._id)} className="btn btn-pink-200" to=''>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table> 
    </div>
    )
}

export default Search;
