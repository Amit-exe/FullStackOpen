import { useState } from "react";
import Course from "./Components/Course";
import axios from "axios"
import { useEffect } from "react";

const baseUrl = '/api/notes'

const App = () => {
  const [courses,setCourse] = useState(null) 
  useEffect( ()=>
    
    
   { axios.get(baseUrl).then((res)=>{
    console.log(res.data)
    setCourse(res.data)

  }).catch((error)=>{
    console.error(error);

    
  })},[])

  if(!courses) return <>hello</>
  return courses.map((course) => <Course key={course.id} course={course} />);
};

export default App;
