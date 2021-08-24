import React, { useState } from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';


const format='dd/MM/yyyy';
function formatDate(date,format,locale){
  return dateFnsFormat(date,format,(locale));
}

const AddTask=({onAddTask, onCancel})=>{
  const [task,setTask]=useState('')
  const [date,setDate]=useState(null);
  return(
    <div className="add-task-dialog">
    <input value={task} onChange={(event)=>setTask(event.target.value)}/>
    <div className="add-task-actions-container">
      <div className="btns-container">
        <button className="add-btn" onClick={()=>{onAddTask(task,date);onCancel();setTask("");}}>Add task</button>
        <button className="cancel-btn" onClick={()=>{onCancel();setTask("");}}>Cancel</button>
      </div>
      <div className="icon-container">
        <DayPickerInput onDayChange={(day)=>setDate(day)}  placeholder={`${dateFnsFormat(new Date(),format)}`}
          formatDate={formatDate}
          format={format}
          dayPickerProps={{
            modifiers:{
              disabled:[{before:new Date()}]
            }
          }}
        />
      </div>
    </div>
    </div>
  )
}

const TASK_HEADER_MAPPING={
  INBOX:"Inbox",
  TODAY:"Today",
  NEXT_7: "Next 7 Days"
}

const TaskItems=({selectedTab,tasks})=>{
  let taskToRender=[...tasks];
  if(selectedTab==='NEXT_7'){
    // return tasks
    // .filter(
    //   (task) =>
    //   isAfter(task.date,new Date()) && 
    //   isBefore(task.date,addDays(new Date(),7))
    // )
    // .map((task)=>(
    //   <p>
    //     {task.text} {dateFnsFormat( new Date(task.date),format)}{" "}
    //   </p>
    // ));
    taskToRender=taskToRender.filter(
      (task)=>
      isAfter(task.date,new Date()) && 
      isBefore(task.date,addDays(new Date(),7))
    )
  }
  if(selectedTab==='TODAY'){
    // return tasks
    // .filter((task)=>isToday(task.date))
    // .map((task)=>(
    //   <p>
    //     {task.text} {dateFnsFormat( new Date(task.date),format)}{" "}
    //   </p>
    // ))
    taskToRender=taskToRender.filter((task)=>isToday(task.date));
  }

  return(
    <div className="task-items-container">
      {taskToRender.map((task)=>(
        <div className="task-item">
          <p>{task.text}</p>
          <p>{dateFnsFormat( new Date(task.date),format)}</p>
        </div>
      ))}
    </div>
  )
  //  tasks
  //   .map((task)=>(
  //     <p>
  //       {task.text} {dateFnsFormat( new Date(task.date),format)}{" "}
  //     </p>
  //   ))

}
 const Tasks=({selectedTab})=>{
   const [showAddTask ,setShowAddTask]=useState(false)
   const [tasks, setTasks]=useState([]);

   const addNewTask=(text,date)=>{
     const newTaskItem={text,date:date|| new Date()};
     setTasks((prevState)=>[...prevState,newTaskItem])
   }
   return(
     <div className="tasks">
       <h1>
         {TASK_HEADER_MAPPING[selectedTab]}
         {/* Inbox */}
       </h1>
       <div className="add-task-btn"
       onClick={()=>setShowAddTask((prevState)=>!prevState)}>
        <span className="plus">+</span>
        <span className="add-task-text">Add task</span>
       </div>
       {showAddTask && <AddTask onAddTask={addNewTask} onCancel={()=>setShowAddTask(false)}/>}
       {tasks.length> 0 ? <TaskItems tasks={tasks} selectedTab={selectedTab}/>: <p>No task yet</p>}
     </div>
   )
 }

export default Tasks;