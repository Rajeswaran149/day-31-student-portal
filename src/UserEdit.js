import React from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"


function UserEdit() {
    let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let user = await axios.get(
          `https://6214bf2189fad53b1f1d825c.mockapi.io/students/${params.id}`
        );
        formik.setValues(user.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, []);

  let formik = useFormik({
    initialValues: {
      name: "",
      age: 0,
      dob: "",
      address: "",
      class: "",
      year:0,
    },
    validate: (values) => {
      const errors = {};
      if(!values.name){
        errors.name = "Name should not be blank";
      }
      if (!values.address) {
        errors.dob = "dob should not be blank";
      }
      if (!values.dob) {
        errors.address = "Address should not be blank";
      }
      if (!values.age ) {
        errors.age = "Age should not be blank and should be greater than 18";
      }
      if (!values.class) {
        errors.Class = "Class should not be blank";
      }
      if (!values.year) {
        errors.year = "Year should not be blank";
      }
      return errors;
    },
  
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://6214bf2189fad53b1f1d825c.mockapi.io/students/${params.id}`, values
        );

        navigate("/User", { replace: true })
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center">Create User Details</h1>
      <div className="row">
        <div className="col-lg-6">
          <label>Name</label>
          <input
            type={"text"}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control"
            style={{ border: formik.errors.name ? "1px solid red" : "" ,
            border: formik.values.name ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.name}</span>
        </div>
        <div className="col-lg-6">
          <label>DOB</label>
          <input
            type={"text"}
            name="dob"
            onChange={formik.handleChange}
            value={formik.values.dob}
            className="form-control"
            style={{ border: formik.errors.dob ? "1px solid red" : "" ,
            border: formik.values.dob ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.dob}</span>
        </div>
        <div className="col-lg-6">
          <label>Address</label>
          <input
            type={"text"}
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="form-control"
            style={{ border: formik.errors.address ? "1px solid red" : "" ,
            border: formik.values.address ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.address}</span>
        </div>
        <div className="col-lg-6">
          <label>Age</label>
          <input
            type={"number"}
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="form-control"
            style={{ border: formik.errors.age ? "1px solid red" : "" ,
            border: formik.values.age ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.age}</span>
        </div>
        <div className="col-lg-6">
          <label>Class</label>
          <input
            type={"string"}
            name="class"
            onChange={formik.handleChange}
            value={formik.values.class}
            className="form-control"
            style={{ border: formik.errors.class ? "1px solid red" : "" ,
            border: formik.values.class ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.class}</span>
        </div>
        <div className="col-lg-6">
          <label>Year</label>
          <input
            type={"number"}
            name="year"
            onChange={formik.handleChange}
            value={formik.values.year}
            className="form-control"
            style={{ border: formik.errors.year ? "1px solid red" : "" ,
            border: formik.values.year ? "1px solid green" : "" }}
          />
          <span style={{ color: "red" }}>{formik.errors.year}</span>
        </div>
        <div className="col-lg-6 mt-3">
          <input type={"submit"} className="btn btn-primary" />
        </div>
      </div>
    </form>
  </div>
  )
}

export default UserEdit