const mongoose = require('mongoose');
const url = 'mongodb+srv://user1:newpassword@cluster0.ec9tf.mongodb.net/Aupp?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url)
      .then( () => 
             {
               console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
             })
      .catch( err => 
              {
               console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
               process.exit();
              });
module.exports = mongoose;
const schema_mongoose = require('mongoose');

const EmployeeSchema = schema_mongoose.Schema(
    {
       empid: {type: Number},
       name: { type: String },
       emailid: { type: String },
       pass: { type: String },
       salary: { type: Number },
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('emp_collection', EmployeeSchema);
//REG API
app.post('/reg', (req, res) => {
  
  const empobj = new EmpModel({
    empid: req.body.employeeid,
    name: req.body.firstname,
    emailid: req.body.email,
    pass: req.body.password,
    salary: req.body.sal,
  });//CLOSE EmpModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD
app.post('/reg', (req, res) => {
  
  const empobj = new EmpModel({
    empid: req.body.empid,
    name: req.body.name,
    emailid: req.body.emailid,
    pass: req.body.pass,
    salary: req.body.salary,
  });//CLOSE EmpModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

/*
In the postman use the following URL :- Select GET
localhost:5000/view
*/

//VIEW ALL API GET
app.get('/view', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
});//CLOSE GET
//REG API POST
app.post('/reg', (req, res) => {
  
  const empobj = new EmpModel({
    empid: req.body.empid,
    name: req.body.name,
    emailid: req.body.emailid,
    pass: req.body.pass,
    salary: req.body.salary,
  });//CLOSE EmpModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD
//VIEW ALL Emp API GET
app.get('/view', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
});//CLOSE GET

/*
In the postman use the following URL :- Select GET
localhost:5000/search/500
*/

//Search Emp by empid API GET
app.get('/search/:empid', (req, res) => {
  EmpModel.find({ "empid": parseInt(req.params.empid)})
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD
//Delete API
app.delete('/del/:empid', (req, res) => {
    EmpModel.findOneAndDelete({ "empid": parseInt(req.params.empid) })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
); //CLOSE Delete METHOD
//Update API
app.put('/update/:empid', (req, res) => {
  EmpModel.findOneAndUpdate({ "empid": parseInt(req.params.empid) },
  {
    $set: {
      "pass": req.body.password,
      "salary": req.body.sal
    }
  }, { new: true })
  .then(getupdateddocument => {
    if (getupdateddocument != null)
      res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
    else
      res.status(404).send('INVALID EMP ID ' + req.params.empid);
  }) // CLOSE THEN
  .catch(err => {
    return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.empid });
  }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION
); //CLOSE PUT METHOD
