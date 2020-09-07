import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "/api/v1/employees";

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
}

const getEmployees = () => {
    return axios.get(EMPLOYEE_API_BASE_URL, { headers });
}

const createNewEmployee = (employee) => {
    return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers });
}

const getEmployeeById = (employeeId) => {
    return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId, { headers });
}

const updateEmployee = (employee, employeeId) => {
    return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee, { headers });
}

const deleteEmployeeById = (employeeId) => {
    return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId, { headers });
}

export default { getEmployees, getEmployeeById, updateEmployee, deleteEmployeeById, createNewEmployee };