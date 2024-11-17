import React from 'react'
import { useUpdatePasswordMutation } from '../../redux/api/User';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../component/User'

const Index = () => {
    const [oldPassword, setOldPassword] = React.useState('')
    const [password, setPassword] = React.useState('')


    const navigate = useNavigate();

    const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation()

    React.useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success('Password Updated Successfully');
            navigate('/me/profile');
        }
    }, [error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            oldPassword,
            password
        }

        updatePassword(userData)
    }
    return (
        <>
            <UserLayout>
                <div className="row wrapper">
                    <div className="col-10 col-lg-8">
                        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                            <h2 className="mb-4">Update Password</h2>
                            <div className="mb-3">
                                <label htmlFor="old_password_field" className="form-label">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="new_password_field" className="form-label">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
                                {isLoading ? "Password Updating" : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </UserLayout>
        </>
    )
}

export default Index
