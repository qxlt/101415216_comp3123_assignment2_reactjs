import React, { Component } from "react";
import api from './ApiConfig/ApiConfig'
import { Link } from 'react-router-dom'
import '../ListEmp.css'

export default class ListEmp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            searchKeyword:{
                lname:'',
                fname:'',
                email: ''
            },
            DataisLoaded: false,
        };
    }


    async componentDidMount() {
        const response = await api.get('/emp/employees');        
        this.setState({
            employees: response.data,
            DataisLoaded: true,
        });
    }

    nameDisplay = (name) =>{
        return name.charAt(0).toUpperCase()+name.slice(1); 
    }

    handleSearch = async() =>{
        const { searchKeyword } = this.state;
        const queryParams = new URLSearchParams(searchKeyword).toString();
        window.location.href = `/Search?${queryParams}`
    }

    handleDetail = async(empId) =>{
        const eid = {eid: empId}
        const queryParams = new URLSearchParams(eid).toString();
        window.location.href = `/Detail?${queryParams}`
    }

    handleDelete = async(empId) =>{
        const response = await api.delete(`/emp/employees?eid=${empId}`);
        if (response.data && response.data.message) {
            alert(response.data.message);
        } else {
            alert('Employee deleted successfully.');
            this.componentDidMount()
        }
    }

    handleLogout = ()=>{
        this.setState({
            DataisLoaded: false
        })
        localStorage.removeItem('userToken');
        window.location.href = '/Login'
    }

    render(){
        const { DataisLoaded, employees } = this.state;
        if (!DataisLoaded)
            return (
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>
            );

        return (
            <div className="container">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h1 className="title mt-3 mb-3">Employees</h1>
                <button onClick={this.handleLogout} className="btn btn-pink-500">Log out</button>
            </div>
                <div class="search container mb-3">
                    <input onChange={(e) => {
                         if(e.target.value.includes(' ')){
                            const name = e.target.value.split(' ');
                            this.setState({
                                searchKeyword: {
                                    fname: name[0],
                                    lname: name[1]
                                }
                            })
                        }else if (e.target.value.includes("@")){
                            this.setState({
                                searchKeyword: {
                                    email: e.target.value
                                }
                            })
                        }else{
                            this.setState({
                                searchKeyword: {
                                    fname: e.target.value,
                                }
                            })
                        }}
                    }type="text" placeholder="Search..."></input>
                    <button onClick={this.handleSearch} className="btn btn-search">Search</button>
                </div>
                <div className="container">
                    <Link to='/AddEmployee' className='btn btn-pink-500'>Add Employees</Link>
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
                                <td>{this.nameDisplay(emp.first_name)}</td>
                                <td>{this.nameDisplay(emp.last_name)}</td>
                                <td>{emp.email}</td>
                                <td>
                                    {/* Detail */}
                                    <button onClick={()=> this.handleDetail(emp._id)} className="btn btn-red-400" >Details</button>
                                    {/* Delete */}
                                    <button onClick={() => this.handleDelete(emp._id)} className="btn btn-pink-200" to=''>Delete</button>  
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                </div>
            </div>
        );
    }
}