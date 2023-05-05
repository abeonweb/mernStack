const express = require('express')
const router = express.Router()
//use of controllers
const {
    getEmployee, 
    getAllEmployees, 
    createNewEmployee, 
    updateEmployee, 
    deleteEmployee, } = require('../../controllers/employeesController')

const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
    

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

    //route for named parameter
router.route('/:id')
    .get(getEmployee)

module.exports = router