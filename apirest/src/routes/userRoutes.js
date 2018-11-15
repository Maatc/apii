const User =require('../models/user');


module.exports = function (app){

app.get('/users', (req, res) =>{
	//res.json([]);
	User.getUsers((err,data) =>{
		res.status(200).json(data);

	});
});


app.post('/users',(req,res) =>{
	console.log(req.body);
	
  const userData = {
		nombre: req.body.nombre,
		salon: req.body.salon,
		turno: req.body.turno,
		id: null
		//created_at: null,
		//update_at: null
	};

	User.insertUser(userData, (err,data) =>{
		if (data && data.insertId){
			console.log(data);
			//res.status(200).json
			res.json({
				success: true,
				msg: 'Inserted a new user',
				data: data
			})
			// res.direct ('/users/' * data.insert:Id)
			}else{
				res.status(500).json({
					success:false,
					msg: "error"
				})
			}
	})

	});

app.put('/users/:id', (req, res)=>{
	const userData =Data ={
		//id: req.body.id,
		id: req.params.id,
		nombre: req.body.nombre,
		salon: req.body.salon,
		turno: req.body.turno
		//created_at:null,
		//update_at: null
	};
	User.updateUser(userData, (err, data)=>
	{
		if(data && data.msg){
			res.json(data)
		}else {
			res.json({
				success:false,
				msg: 'error'
			         })
		       }
	})
});

app.delete('/users/:id', (req, res) =>
{
	User.deleteUser(req.params.id, (err,data)=>
	{
	
	if (data && data.msg ==='borrado' || data.msg ==='no existe')
	{
	res.json({
		success: true,
		data
	         });	
	} else {
		res.status(500).json({
			msg: 'error'
		                    });
	       }	
	});
});

};


