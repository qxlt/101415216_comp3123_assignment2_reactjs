import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from './ApiConfig/ApiConfig'
import '../ListEmp.css'

function Signup() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repassword, setRePassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert('All fields are required');
            return;
        }
        
        if (password === repassword){

            try {
                const response = await api.post('/user/signup', { username, email, password });
                console.log(response.data.message);
                alert(response.data.message);
                navigate('/Login');
            } catch (err) {
                console.error(err); 
                alert(err.response?.data?.message || "An error occurred. Please try again.");
            }
        }else{
            alert("You password doesn't match")
            return;
        }
    };


    return(
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign Up</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input 
                            id="username"
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input 
                            id="repassword"
                            type="password"
                            placeholder="Confirm Password"
                            name="repassword"
                            className="form-control rounded-0"
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-pink-400 w-100 rounded-0 text-decoration-none"
                    onClick={handleSubmit}>
                        Register
                    </button>
                    <Link to="/Login">Already have an account?</Link>
                </form>
            </div>
        </div>
    )
}
export default Signup;

