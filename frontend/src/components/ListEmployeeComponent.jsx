import React from 'react';
import EmployeeService from '../services/EmployeeService';
import { useHistory } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const history = useHistory();
    const [employees, setEmployees] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(true);

    const ROLE = localStorage.getItem("role") ? localStorage.getItem("role") : "USER";

    if (firstLoad) {
        EmployeeService.getEmployees().then(res => {
            setEmployees(res.data);
            setFirstLoad(false);
        }).catch(_ => {
            localStorage.removeItem("jwt");
            history.push("/");
        })
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployeeById(id).then(res => {
            setEmployees(employees.filter(employee => employee.id !== id));
        }).catch(_ => {
            localStorage.removeItem("jwt");
            history.push("/");

        })
    }

    const viewEmployee = (id) => {
        history.push(`/view-employee/${id}`);
    }

    const editEmployee = (id) => {
        history.push(`/add-employee/${id}`);
    }

    const addEmployee = () => {
        history.push('/add-employee/_add');
    }

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button className="btn btn-primary" disabled={ROLE !== "ADMIN"} onClick={addEmployee}> Add Employee</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td>
                                            <button onClick={() => editEmployee(employee.id)} className="btn btn-info" disabled={ROLE !== "ADMIN"} >Update </button>
                                            <button style={{ marginLeft: "10px" }} disabled={ROLE !== "ADMIN"} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee.id)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )

}
export default ListEmployeeComponent;
