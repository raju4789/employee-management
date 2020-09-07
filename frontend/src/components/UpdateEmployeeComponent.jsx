import React from 'react'
import { useHistory } from 'react-router-dom';

import EmployeeService from '../services/EmployeeService';

const UpdateEmployeeComponent = (props) => {
    const history = useHistory();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [emailId, setEmailId] = React.useState("");
    const [firstLoad, setFirstLoad] = React.useState(true);

    const id = props.match.params.id;

    if (firstLoad) {
        EmployeeService.getEmployeeById(id).then((res) => {
            let { firstName, lastName, emailId } = res.data;
            setFirstName(firstName);
            setLastName(lastName);
            setEmailId(emailId);
            setFirstLoad(false);
        });
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName, lastName, emailId };
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(id));
        EmployeeService.updateEmployee(employee, id).then(res => {
            history.push('/employees');
        });
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


    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
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

                                <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateEmployeeComponent
