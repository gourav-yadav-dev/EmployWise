import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (data) => {
            axios.post('https://reqres.in/api/login', data)
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    alert('login successfully...')
                    if (localStorage.getItem('token') == res.data.token){
                        navigate('/listuser')
                    }
                })
                .catch(error => {
                    console.log(error);

                })
        }
    })
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="mb-3 fs-1">User Login</div>
            <form className="lg:w-100 sm:w-3/4 md:w-3/4 border p-5" onSubmit={formik.handleSubmit}>
                <label >Enter your email</label>
                <input type="email" placeholder="enter your email" className="form-control mb-3" name="email" onChange={formik.handleChange}></input>
                <label>Enter your password</label>
                <input type="text" placeholder="enter your password" className="form-control mb-3" name="password" onChange={formik.handleChange}></input>
                <button className="btn btn-primary w-100" type="submit">Login</button>

            </form>
        </div>
    )
}