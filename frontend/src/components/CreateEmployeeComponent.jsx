import React from 'react';
import { useHistory } from 'react-router-dom';

import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = (props) => {

    const history = useHistory();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [emailId, setEmailId] = React.useState("");
    const [firstLoad, setFirstLoad] = React.useState(true);

    const id = props.match.params.id;

    if (firstLoad) {
        if (id !== '_add') {
            EmployeeService.getEmployeeById(id).then((res) => {
                const { firstName, lastName, emailId } = res.data;
                setFirstName(firstName);
                setLastName(lastName);
                setEmailId(emailId);
                setFirstLoad(false);
            }).catch(_ => {
                localStorage.clear();
                history.push("/");
            })
        }
    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, emailId };

        if (id === '_add') {
            EmployeeService.createNewEmployee(employee).then(_ => {
                history.push('/employees');
            }).catch(_ => {
                localStorage.clear();
                history.push("/");
            });
        } else {
            EmployeeService.updateEmployee(employee, id).then(_ => {
                history.push('/employees');
            }).catch(_ => {
                localStorage.clear();
                history.push("/");
            });
        }
    }

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmailId(event.target.value);
    }

    const cancel = () => {
        history.push('/employees');
    }

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={firstName} onChange={changeFirstNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={lastName} onChange={changeLastNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Email Id: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={emailId} onChange={changeEmailHandler} />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateEmployeeComponent;
