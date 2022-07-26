import React from 'react';
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react"

function User() {
    const [user, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let users = await axios.get(
                "https://6214bf2189fad53b1f1d825c.mockapi.io/students"
            );
            setUsers(users.data);
        }
        fetchData();
    }, []);
    const deleteUser = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`https://6214bf2189fad53b1f1d825c.mockapi.io/students/${id}`)
                    .then(() => {
                        getData();
                    });

                swal(" Your file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your file is safe!");
            }
        });
    };
    const getData = () => {
        axios
            .get(`https://6214bf2189fad53b1f1d825c.mockapi.io/students/`)
            .then((getData) => {
                setUsers(getData);
            });
    };
  return (
    <>
            {/* <div>Userform</div> */}
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-2 text-gray-800">Students Table</h1>
                <Link to={"/Userform"} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i class="fas fa-user fa-sm text-white-50"></i> Student Entry</Link>
            </div>
            <p className="mb-4">
                DataTables is a third party plugin that is used to generate the demo
                table below. For more information about DataTables, please visit the{' '}
                <a target="_blank" href="https://datatables.net">
                    official DataTables documentation
                </a>
                .
            </p>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>DOB</th>
                                <th>Address</th>
                                <th>Class</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>DOB</th>
                                <th>Address</th>
                                <th>Class</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {user.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.age}</td>
                                        <td>{e.dob}</td>
                                        <td>{e.address}</td>
                                        <td>{e.class}</td>
                                        <td>{e.year}</td>
                                        <td className="text-center ">
                                            <Link
                                                to={`/UserView/${e.id}`}
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/UserEdit/${e.id}`}
                                                className="btn btn-success m-1"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteUser(e.id)}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
  )
}

export default User