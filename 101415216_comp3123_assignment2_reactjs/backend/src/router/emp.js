const express = require('express'); 
const router = express.Router();
const empSchema = require('../model/empSchema')

// GET /employees
router.get('/employees', async (req, res) =>{
    try{
        const allEmployees = await empSchema.find({});
        res.status(200).send(allEmployees);
    }catch(err){
        res.status(500).send(err)
    }
})

// POST /employees
router.post('/employees', async (req, res) =>{
    if(!req.body.email){
        res.status(400).send({message: 'cannot pass empty request'});
    }
    try{
        const empData = req.body;
        const emp = new empSchema(empData);
        const newemp = await emp.save();
        console.log('Employee has been added');
        res.status(201).send({
            message: "Employee created successfully.",
            employee_id: newemp.id
        })
    }catch(err){
        res.status(500).send(err)
    }
})

// GET /employees/:eid
router.get('/employees/:eid', async (req, res)=>{
    try{
        const emp = await empSchema.findById(req.params.eid);
        res.status(200).send(emp)
        
    }catch(err){
        res.status(404).send({message: `cannot find the employee with id ${req.params.eid}`})
    }
})

// PUT /employees/:eid
router.put('/employees/:eid', async (req, res)=>{
    if(!req.body){
        res.status(400).send('request body cannot be empty');
    }
    try{
        const emp = await empSchema.findByIdAndUpdate(req.params.eid, {
            ...req.body,
            updated_at: Date.now()
        },
        {new: true});

        if (!emp) {
            return res.status(404).send('Employee not found');
          }

        res.status(200).send(emp)
    }catch(err){
        console.error(err); 
        res.status(500).send('Server error');
    }
})

router.delete('/employees', async (req, res)=>{
    try{
        const eid = req.query.eid;
        const emp = await empSchema.findByIdAndDelete(eid);
        if(emp){
            res.status(204).send({message: "Employee deleted successfully."})
        }else{
            res.status(404).send({message: `cannot find the employee with id ${req.query.eid}`})
        }
    }catch(err){
        res.status(500).send(err);
    }
})

router.get('/search', async (req, res)=>{
    try {
        const fname= req.query.fname;
        const lname= req.query.lname;
        const email= req.query.email;

        if (!fname && !email) {
            return res.status(400).json({ message: "certain query parameter is required" });
        }

        const query = {};
        if (fname) query.first_name = fname;
        if (lname) query.last_name = lname;
        if (email) query.email = email;

        const employees = await empSchema.find(query);

        if (employees.length === 0) {
            return res.status(200).json(employees);
        }
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;