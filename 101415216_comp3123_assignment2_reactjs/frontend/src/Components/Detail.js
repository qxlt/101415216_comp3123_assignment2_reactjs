import React, { useState, useEffect } from 'react';
import api from './ApiConfig/ApiConfig'
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Detail(){
    const [employee, setEmployee] = useState();
    const [loading, setLoading] = useState(true)
    const [updateRequest, setUpdateRequest] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: new Date(),
        department: ''
    });
    const query = useQuery();
    const eid = query.get("eid")


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.put('/emp/employees/' + eid, updateRequest);
            if (response) {
                setEmployee(response.data.emp)
                alert('Employee has been updated successfully!')
            }
        }catch(err){
            alert(err.message)
        }
    }

    useEffect(() => {
        const fetchEmployee = async ()=>{
            try{
                const response = await api.get('/emp/employees/'+ eid)
                if (response) {
                    setEmployee(response.data);
                    setUpdateRequest(response.data);
                    setLoading(false);
                }
            }catch(err){
                alert(err.message)
                setLoading(false);
            }
        }
        if(eid) fetchEmployee();

    }, [eid])

    if(loading){
        return(
            <h2>Loading</h2>
        )
    }

    return(
        <div className="container w-50 mt-3 align-item-center">
                 <h2>Employee Details</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstname">
                            <strong>First Name</strong>
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            className="form-control rounded-0"
                            defaultValue={updateRequest.first_name}
                            onChange={(e) =>
                                setUpdateRequest((prevState) => ({
                                    ...prevState,
                                    first_name: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname">
                            <strong>Last Name</strong>
                        </label>
                        <input 
                            id="lastname"
                            type="text"
                            name="lastname"
                            defaultValue={updateRequest.last_name}
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setUpdateRequest((prevState) => ({
                                    ...prevState,
                                    last_name: e.target.value,
                                }))
                            }
                        />                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            id="email"
                            type="text"
                            name="email"
                            defaultValue={updateRequest.email}
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setUpdateRequest((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position">
                            <strong>Position</strong>
                        </label>
                        <select 
                            id="position"
                            name="position"
                            defaultValue={updateRequest.position}
                            className="form-control rounded-0"
                            onChange={(e) =>
                                setUpdateRequest((prevState) => ({
                                    ...prevState,
                                    position: e.target.value,
                                }))
                            }
                        >
                            <option value="junior">Junior</option>
                            <option value="intermedian">Intermedian</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary">
                            <strong>Select Salary Range</strong>
                        </label>
                        <select
                            id="salary"
                            name="salary"
                            className="form-control rounded-0"
                            defaultValue={updateRequest.salary}
                            onChange={(e)=>setUpdateRequest((prevState) =>({
                                ...prevState,
                                salary: e.target.value
                            }
                            ))}
                            >
                                    <option value={40000}> $40,000 ~</option>
                                    <option value={50000}> $50,000 ~</option>
                                    <option value={60000}> $60,000 ~</option>
                                    <option value={70000}> $70,000 ~</option>
                                    <option value={80000}> $80,000 ~</option>
                                    <option value={90000}> $90,000 ~</option>
                                    <option value={100000}> $100,000 ~</option>
                        </select> 
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department">
                            <strong>Enter Department</strong>
                        </label>
                        <select 
                            id="department"
                            name="department"
                            className="form-control rounded-0"
                            defaultValue={updateRequest.department}
                            onChange={(e) =>
                                setUpdateRequest((prevState) => ({
                                    ...prevState,
                                    department: e.target.value,
                                }))
                            }
                        >
                            <option value="IT">Information Technology</option>
                            <option value="Admin">Administrative Office</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="Management">Management</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="datepicker">
                            <strong>Date of Join</strong>
                        </label><br />
                        <DatePicker 
                        id="datepicker"
                        name="datepicker" 
                        className="form-control rounded-0"
                        defaultValue={updateRequest.date_of_joining}
                        selected={new Date(updateRequest.date_of_joining)}
                        onChange={(e) =>
                            setUpdateRequest((prevState) => ({
                                ...prevState,
                                date_of_joining: e,
                            }))
                        } />
                    </div>
                    <button type="submit" className="btn btn-pink-500 w-25"
                    onClick={handleSubmit}>
                            Update
                    </button>
                    
                </form>
            </div>
    )
 
}



export default Detail;