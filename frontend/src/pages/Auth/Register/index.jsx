import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useRegisterMutation } from '../../../redux/api/Auth';
import toast from 'react-hot-toast';

const Index = () => {
    const [register, { data, isLoading, error }] = useRegisterMutation();

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    React.useEffect(() => {
        if (error) toast.error(error?.data?.message)
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();

        const signUpData = {
            name,
            email,
            password
        }

        register(signUpData);
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        action="your_submit_url_here"
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Register</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onInputChange}
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
                                onChange={onInputChange}
                            />
                        </div>

                        <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Creating" : "REGISTER"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index
