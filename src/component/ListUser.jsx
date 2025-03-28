import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
export function ListUser() {
    const [page, setpage] = useState(1)
    const [user, setuser] = useState([{ id: 0, email: '', first_name: '', avatar: '', last_name: '' }])
    const [error, seterror] = useState(false)
    const [status, setstatus] = useState(false)
    // const thread = useRef(false)
    const navigator=useNavigate()
    useEffect(() => {
        const token=localStorage.getItem('token')
        if(token){
            axios.get(`https://reqres.in/api/users?page=${page}`)
            .then(resp => {
                setuser(resp.data.data)
            })
            .catch(error => {
                seterror(true)
            })
        }
        else{
            navigator('/')
        }

    }, [page, location.state?.refresh, status])

    function handleDelete(e) {
        const isConfrimed = window.confirm('your want to delete your record')
        if (!isConfrimed) {
            return;
        }
        try {
            setuser(preuser => preuser.filter(data => data.id !== e))
            axios.delete(`https://reqres.in/api/users/${e}`);
            alert('data is deleted successfully')
        }
        catch (error) {
            alert(`this is some issues ${error}`)

        }

    }

    if (!error) {
        return (
            <div>
                <div className="d-flex  flex-col  justify-content-around  sm:h-auto  lg:h-lvh" >
                    <div className="text-center fw-bold  fs-1">Page{page}</div>
                    <div className="d-flex justify-content-around flex-wrap justify-content-between">{
                        user.map(data =>
                            <div key={data.id} className="card mx-1 my-1 d-flex flex-col justify-between" style={{ height: "310px" }}>
                                <img src={data.avatar} className="card-img-top" height="200px" width="100%"></img>
                                <div className="card-header">
                                    <div>FirstName:{data.first_name}</div>
                                    <div>LastName:{data.last_name}</div>
                                </div>
                                <div className="footer  d-flex flex-col justify-between">
                                    <Link className="btn btn-success w-100 my-1" to={`/edit/${data.id}`}>Edit</Link>
                                    <button className="btn btn-danger w-100" onClick={() => handleDelete(data.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                    </div>
                    <div className=" lg:flex lg:justify-center mt-4 mb-4">
                        <div className="btn-group d-flex justify-center align-items-center">

                            <button className="btn btn-primary mx-1" onClick={() => setpage(1)}>1</button>
                            <button className="btn btn-primary mx-1" onClick={() => setpage(2)}>2</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1>Please Wait some issues and Reload the page again</h1>
            </div>
        )
    }

}