import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const[ inputValue,setInputValue ] = useState("");
	const[ todos,setTodos ] = useState([]);

//mostrar
let getMethod = {
	method: "GET",
    headers: {
        "Content-Type": "application/json"
	  },  
}


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
    .catch(error => {
        //manejo de errores
        console.error(error);
    });
}


const deleteTodo = (taskIndex) => {
	let todosObject ={
		label : taskIndex,
		done: false
	};
	let putMethod = {
		method: "PUT",
		body: JSON.stringify(todos),
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
		let newList = todos.filter((t,currentIndex) => taskIndex != currentIndex)
		console.log(newList);
		setTodos(newList);

    })  
    .catch(error => {
        //manejo de errores
        console.error(error);
    });
}

const clearTodos = () => {
	let todosObject ={
		label : "Example Task",
		done: false
	};
	let putMethod = {
		method: "PUT",
		body: JSON.stringify([todosObject]),
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
		
		setTodos(todosObject);

    })  

    .catch(error => {
        //manejo de errores
        console.error(error);
    });
}


//put method - delete todo
const deleteTodos = () => {

	fetch(`https://playground.4geeks.com/apis/fake/todos/user/Aleska`,{ 
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		  },
		//   PARAMS:none
		}
	)
    .then(resp => {
		if (resp.status >= 200 && resp.status < 300){
			console.log("El request se hizo bien");
			return (resp.json());
		}else{
			console.log(`Hubo un error ${resp.status} en el request`);
		}
		setTodos([]);
		return(resp.json());
    })  
	.then(data => {
		if(data.ok){
		console.log('Lista eliminada');
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
								deleteTodo(index)
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
			<button onClick={()=>deleteTodos()}>Delete everything</button>
			<button onClick={()=>clearTodos()}>Delete list</button>
		</div>
	);
};

export default Home;
