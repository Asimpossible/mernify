import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../redux/api/User';
import toast from 'react-hot-toast';
import UserLayout from '../../component/User'
import { useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'

const Index = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation()

    React.useEffect(() => {
        if (user) {
            setName(user?.name)
            setEmail(user?.email)
        }

        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success('User Updated Successfully');
            navigate('/me/profile');
        }
    }, [user, error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email
        }

        updateProfile(userData)
    }

    return (
        <>
            <MetaData title={"Update Profile"} />
            <UserLayout>
                <div className="row wrapper">
                    <div className="col-10 col-lg-8">
                        <form
                            className="shadow rounded bg-body"
                            action="#"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={submitHandler}
                        >
                            <h2 className="mb-4">Update Profile</h2>

                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label"> Name </label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email_field" className="form-label"> Email </label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>

                            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
                                {isLoading ? 'Updating' : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            </UserLayout>
        </>
    )
}

export default Index