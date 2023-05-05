const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees.length ? data.employees.length + 1 : 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname)
        return res.status(400
        ).json({ "message": "First and Last names are required." })
    const allEmployees = [...data.employees, newEmployee]
    data.setEmployees(allEmployees)
    return res.status(201).json(data.employees)
}

const updateEmployee = (req, res) => {
    const id = parseInt(req.body.id)
    const employee = data.employees.find(emp => emp.id === id)
    if (!employee)
        return res.status(400).json({ "message": `Employee ID ${id} not found` })
    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(emp => emp.id != id)
    const arr = [...filteredArray, employee]
    data.setEmployees(arr.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data)
}

const deleteEmployee = (req, res) => {
    const id = parseInt(req.body.id)
    const employee = data.employees.find(emp => emp.id === id)
    if (!employee)
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    const filteredArray = data.employees.filter(emp => emp.id != id)
    data.setEmployees([...filteredArray])
    res.json(data.employees)

}

const getEmployee = (req, res) => {
    const id = parseInt(req.params.id)
    const employee = data.employees.find(emp => emp.id === id)
    if (!employee)
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    return res.json(employee)
}

module.exports = { 
    getEmployee, 
    getAllEmployees, 
    createNewEmployee, 
    updateEmployee, 
    deleteEmployee, 
}