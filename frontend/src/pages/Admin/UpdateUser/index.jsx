import React from 'react'
import { AdminLayout } from '../../../components'
import MetaData from '../../../layout/MetaData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../../redux/api/User'
import toast from 'react-hot-toast'

const UpdateUser = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [role, setRole] = React.useState("")

    const navigate = useNavigate();
    const params = useParams()
    const { data } = useGetUserDetailsQuery(params?.id)

    const [updateUser, { error, isSuccess }] = useUpdateUserMutation()

    React.useEffect(() => {
        if (data?.user) {
            setName(data?.user?.name)
            setEmail(data?.user?.email)
            setRole(data?.user?.role)
        }
    }, [data])

    React.useEffect(() => {

        if (error) {
            toast.error(error?.data?.message)
        }

        if (isSuccess) {
            toast.success('User Updated Successfully');
            navigate('/admin/users');
        }
    }, [error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            role
        }

        updateUser({ id: params?.id, body: userData })
    }
    return (
        <>
            <AdminLayout>
                <MetaData title={"Update User"} />
                <div className="row wrapper">
                    <div className="col-10 col-lg-8">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h2 className="mb-4">Update User</h2>

                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label">Name</label>
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
                                <label htmlFor="email_field" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role_field" className="form-label">Role</label>
                                <select id="role_field" className="form-select" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            <button type="submit" className="btn update-btn w-100 py-2">
                                Update
                            </button>
                        </form>
                    </div>
                </div >
            </AdminLayout >
        </>
    )
}

export default UpdateUser
