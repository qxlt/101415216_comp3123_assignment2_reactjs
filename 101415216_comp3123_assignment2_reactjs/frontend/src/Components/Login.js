import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './ApiConfig/ApiConfig'
import '../ListEmp.css'

function Login() {

    const [loginCredential, setloginCredential] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!loginCredential || !password){
            alert('All fields are required.')
            return;
        }
        try{
            const response = await api.post('/user/login', {loginCredential, password})
            console.log(response.data.message);
            alert(response.data.message);
            navigate('/ListEmployee');
        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "An error occurred. Please try again.");
        }

    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form>
                <div className="mb-3">
                        <label htmlFor="loginCredential">
                            <strong>Username/Email</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder='Enter Username/Email'
                        name="loginCredential"
                        className='form-control rounded-0'
                        onChange={(e) => setloginCredential(e.target.value)}
                        / >
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input 
                        type="password"
                        placeholder='Enter Password'
                        name="password"
                        className='form-control rounded-0'
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='btn btn-pink-400 w-100 rounded-0 text-decoration-none'
                    onClick={handleSubmit}>
                        Login
                    </button>

                </form>

            </div>
        </div>
    )
}
export default Login;

