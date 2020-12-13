const express = require("express");
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

    //Input data
    const testdata = [
      {
         
          type: "durban",
          crux:"Indices", 
          color: "green", 
          title: "indict the idiot"
      }, 
  ];
  
  //Respond with 'Input validation express js' to / directory
  app.get('/', (_, res) =>{
      res.send('Junior_Dev_Test');
  });
  
  //Respond with an object array of testdata as json
  app.get('/testdata', (req, res) => {
      res.json(testdata);
  });
  
  //Input data Validation
  app.post('/add_data',[
      check('type').contains('durban', { ignoreCase: true}).withMessage( 
          "Testdata type must contain the value 'durban'"),
      check('crux').contains('Indices', { ignoreCase: true}).withMessage( 
          "Testdata crux must contain the value 'Indices'") ,
      check('color').contains('green', { ignoreCase: true}).withMessage( 
          "Testdata color must contain the value 'green'") ,
      check('title').contains('indict the idiot', { ignoreCase: true}).withMessage( 
          "Testdata title must contain the value 'indict the idiot'") 
    ], (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
  
          return res.status(422).json({errors: errors.array()});
        }else{
          return res.json('Valid');
        }
  
      const { type, crux, color, title } = req.body;
      if (type && crux && color && title){
          testdata.push({type, crux, color, title});
          res.json({ ok: true, testdata});
      }
  });
  
  //Removes 'type' attribute from array object
  app.delete('/testdata/:type', (req, res) =>{
  
      //If attribute is note found, respond with attribute not found
      const result = testdata.find(f => f.type === req.params.type);
      if (!result)
          return res.status(404).send('Attribute not found')
      
      const index = testdata.indexOf(result);
      testdata.splice(index, 0);
  
      //Return data
      return res.send(result);
      
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
