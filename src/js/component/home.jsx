import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const[ inputValue,setInputValue ] = useState("");
	const[ todos,setTodos ] = useState([]);
	const[ todoId,setTodoId ] = useState([]);

	let url = "https://playground.4geeks.com/apis/fake/todos/user/Aleska";
//mostrar
let getMethod = {
	method: "GET",
    headers: {
        "Content-Type": "application/json"
	  },  
}

//eliminar
// let deleteMethod = {
// 	method: "DELETE",
// 	headers: {
//         "Content-Type": "application/json"
// 	  }
// }

//crear
// let postMethod = {
// 	method: "POST",
// 	headers: {
// 		"Content-Type": "application/json"
// 	},
// 	BODY: []	
// }


//GET METHOD
useEffect(()=>{
	fetch('https://playground.4geeks.com/apis/fake/todos/user/Aleska', getMethod)
    .then(resp => {
		if (resp.status >= 200 && resp.status < 300){
			console.log("El request se hizo bien");
			return (resp.json());
		}else{
			console.log(`Hubo un error ${resp.status} en el request`);
		}
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		setTodos(data);
    })
    .catch(error => {
        //manejo de errores
        console.error(error);
    });
	console.log(todos);
},[]);

//POST METHOD (crear)
// const createUser = () => {
// 	fetch('https://playground.4geeks.com/apis/fake/todos/user/Aleska', postMethod)
//     .then(resp => {
// 		if (resp.status >= 200 && resp.status < 300){
// 			console.log("El request se hizo bien");
// 			return (resp.json());
// 		}else{
// 			console.log('Hubo un error ${resp.status} en el request');
// 		}
//     })
//     .then(data => {
// 		// let todosObject ={
// 		// 	label : "",
// 		// 	done: false
// 		// };
//         //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
//         data = data.map((t) => {
// 			todosObject.label = t;
// 		})
//     })
//     .catch(error => {
//         //manejo de errores
//         console.error(error);
//     });
// }


//put method - agregar
const updateTodos = (task) => {
	let todosObject ={
		label : task,
		done: false
	};
	let putMethod = {
		method: "PUT",
		body: JSON.stringify(todos.concat(todosObject)),
		headers: {
			"Content-Type": "application/json"
		  }
	}
	fetch('https://playground.4geeks.com/apis/fake/todos/user/Aleska', putMethod)
    .then(resp => {
		if (resp.status >= 200 && resp.status < 300){
			console.log("El request se hizo bien");
			return (resp.json());
		}else{
			console.log(`Hubo un error ${resp.status} en el request`);
		}
		setTodos(todos.concat(todosObject));
    })  
	// .then(data => {
	// 	console.log(data);
	// })
    .catch(error => {
        //manejo de errores
        console.error(error);
    });
}

//put method - delete todo
const deleteTodos = (datoID) => {
	
	// let deleteMethod = {
	// 	method: "DELETE",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	  }
	// }
	// let taskId = task.id;

	fetch(`https://playground.4geeks.com/apis/fake/todos/user/Aleska/${datoID}`,{ 
		method: "DELETE",
		// mode: 'cors',
		// credentials: 'include',
		body:JSON.stringify({datoID}),
		headers: {
			"Content-Type": "application/json"
		  }
		}
	)
    .then(resp => {
		if (resp.status >= 200 && resp.status < 300){
			console.log("El request se hizo bien");
			return (resp.json());
		}else{
			console.log(`Hubo un error ${resp.status} en el request`);
		}
		return(resp.json());
    })  
	.then(data => {
		if(data.ok){
		console.log('Dato eliminado:',data);
		}else{
			console.log("Error in deletion")
		}
	})
    .catch(error => {
        //manejo de errores
        console.error(error);
    });
}

	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
				<li>
					<input id="listInput"
						type = "text"
						onChange = {(e)=> setInputValue(e.target.value)}
						value = {inputValue}
						onKeyDown={(e)=> {							
							if(e.key === "Enter"){						
								updateTodos(inputValue);
								setTodos(todos.concat(inputValue));
								setInputValue('');
								// setTodoId(todoId.concat(inputValue.id));
								// console.log(todoId);
							}
						}}
						placeholder = "What needs to be done?">
					</input>
				</li>
				{todos.map((item,index)=>(
					<li key={index}>{item.label}{" "}
						<i 
							className= "fa-sharp fa-solid fa-trash" 
							onClick={()=>{
								deleteTodos(item.id)
								setTodos(
									todos.filter((t,currentIndex) => index != currentIndex)
										)
								}
								}
								
						></i>
						
					</li>
	
				))}				
			</ul>
			<div>{todos.length} items left</div>
		</div>
	);
};

export default Home;
