
// para iniciarlo ejecutar el siguiente comando D:\practica09.11.18\apirest> node src/app.js
// crear en mysql base de datos colegio tabla alumno  
// campos nombre, salon, turno, id
const mysql = require('mysql');


connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	pasword: 'root',
	database: 'colegio' 
});

let userModel ={};

userModel.getUsers =(callback)=>
{
    if (connection) 
    {
	connection.query(
		'SELECT * FROM alumno',
		(err,rows) => {

			if(err){
				throw err;
			}else {
				callback(null,rows);
			}
		    }
	    )
    }
};

userModel.insertUser =(userData,callback) =>{
	if (connection) {
		connection.query(
			'INSERT INTO alumno SET ?', userData,
			(err, result)=>{
				if(err){
					throw err;
				} else {
					callback(null, {
						'insertId': result.insertId
					})
				}
			})
	}
}

userModel.updateUser =(userData, callback) =>{
	if(connection)
	{
		const sql= `
		UPDATE alumno SET 
		nombre=${connection.escape(userData.nombre)},
		salon=${connection.escape(userData.salon)},
		turno=${connection.escape(userData.turno)}
		WHERE id = ${connection.escape(userData.id)}
		`
		connection.query(sql,(err,result) =>{
			if(err) {
				throw err;
			} else {
				callback(null,{
					"msg": "success"
				         });
			       }
		    }
	    )

	}
};

userModel.deleteUser =(id, callback)=>
{
	if(connection) 
	{
		let    sql =`SELECT * FROM alumno WHERE id =${connection.escape(id)}`;
		connection.query(sql,(err,row)=>
		{

			if (err) 
			{
				let sql =`DELETE FROM alumno WHERE id =${id}`;
				connection.query(sql,(err, result) =>
				{
					if (err)
					{
					  throw err;
			        }   else 
			          {
				        callback(null, {
					    msg: 'borrado'
				        })
			          }
		        })

			}          else 
			            {
		                callback(null,
		                {
			            msg: 'no existe'
		                })
                        }
	    });
    }
};

	 	
module.exports =userModel;
