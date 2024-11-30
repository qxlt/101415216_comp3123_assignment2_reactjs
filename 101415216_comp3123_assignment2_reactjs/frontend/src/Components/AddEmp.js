import React, { Component } from "react"
import api from './ApiConfig/ApiConfig'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../ListEmp.css'

class AddEmp extends Component{
    constructor(props){
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            position: 'junior',
            salary: 40000,
            date_of_joining: new Date(),
            department: 'IT'
        }
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Current State:', this.state)
        if(!this.state.first_name || !this.state.last_name || !this.state.email || 
            !this.state.position ||
            !this.state.salary || !this.state.department
            || !this.state.date_of_joining){
                alert('All fields are required');
                return;
        }
        try{
            const response = await api.post('/emp/employees', this.state)
            console.log(response.data);
            alert(`${response.data.message} Employee ID: ${response.data.employee_id}`)
            window.location.href = '/ListEmployee';
        }catch(err){
            alert(err.message)
            return
        }

    }

    render(){
        return(
            <div className="container w-50 mt-3 align-item-center">
                 <h2>Enter Employee Details</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstname">
                            <strong>First Name</strong>
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            placeholder="Enter First Name"
                            name="firstname"
                            className="form-control rounded-0"
                            onChange={(e) => this.setState({
                                first_name: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname">
                            <strong>Last Name</strong>
                        </label>
                        <input 
                            id="lastname"
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastname"
                            className="form-control rounded-0"
                            onChange={(e) => this.setState({
                            last_name: e.target.value})}   
                        />                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            id="email"
                            type="text"
                            placeholder="Enter Email Address"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => this.setState({
                                email: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position">
                            <strong>Position</strong>
                        </label>
                        <select 
                            id="position"
                            name="position"
                            className="form-control rounded-0"
                            onChange={(e) => this.setState({
                            position: e.target.value})}
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
                            defaultValue={40000}
                            onChange={(e) => this.setState({
                                salary: e.target.value})}>
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
                            defaultValue="IT"
                            onChange={(e) => this.setState({
                            department: e.target.value})}
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
                        selected={this.state.date_of_joining} 
                        onChange={(date) => this.setState({date_of_joining: date})} />
                    </div>
                    <button type="submit" className="btn btn-pink-500 w-25"
                    onClick={this.handleSubmit}>
                            Confirm
                    </button>
                    
                </form>
            </div>
        )
    }

}

export default AddEmp;