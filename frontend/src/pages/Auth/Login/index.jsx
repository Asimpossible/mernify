import React from 'react';
import { useSelector } from 'react-redux'
import { useLoginMutation } from '../../../redux/api/Auth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { setIsAuthenticated } from '../../../redux/features/UserSlice';
import MetaData from '../../../layout/MetaData'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [login, { data, isLoading, error }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);


    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error, isAuthenticated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        }

        login(loginData);
    };


    return (
        <>
            <MetaData title={'Login'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

                        <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Authenticating" : "LOGIN"}
                        </button>

                        <div className="my-3">
                            <Link to="/register" className="float-end">New User?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
