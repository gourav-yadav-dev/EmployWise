import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export function EditUser() {
    const param = useParams();
    const navigate = useNavigate()
    const [product, setproduct] = useState({ email: '', first_name: '', last_name: '' })
    useEffect(() => {
        console.log(param);
        const token = localStorage.getItem('token')
        if(token){

            axios.get(`https://reqres.in/api/users/${param.id}`)
                .then(data => {
                    setproduct(data.data.data)
                    console.log(data.data.data);
    
                })
        }
        else{
            navigate('/')
        }
    }, [param.id])

    const formik = useFormik({
        initialValues: {
            email: product.email,
            first_name: product.first_name,
            last_name: product.last_name
        },
        onSubmit: (data) => {
            // console.log(data);
            axios.put(`https://reqres.in/api/users/${param.id}`, data)
                .then(res => {
                    console.log(res.data);

                    alert('Your data is updated successfully ...')
                    navigate('/listuser', { state: { refresh: true } });
                })
        },
        enableReinitialize: true

    })





    return (



        <div className="d-flex bg-dark d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="p-4 bg-white text-black lg:w-1/2 sm:min-w-2/5">
                <form onSubmit={formik.handleSubmit}>
                    <label >Your firstName</label>
                    <input type="text" className="form-control my-2" name="first_name" value={formik.values.first_name} onChange={formik.handleChange}></input>
                    <label>Your LastName</label>
                    <input type="text" className="form-control" name="last_name" value={formik.values.last_name} onChange={formik.handleChange}></input>
                    <label>Your Email</label>
                    <input type="email" className="form-control my-2" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    <button className="btn btn-primary w-100" type="submit">Submit</button>
                </form>
            </div>

        </div>

    )
}