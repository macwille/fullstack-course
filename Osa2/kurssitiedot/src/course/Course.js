import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = (props) => {
   console.log('Course called: ', props)
   const { courses } = props
   console.log('Courses list:', courses)

   const rows = () => courses.map((course, i) =>
      <li key={i}>
         <Header name={course.name}></Header>
         <Content parts={course.parts}></Content>
         <br></br>
      </li>

   )


   return (
      <div>
         <h1>Web development curriculum</h1>
         <ul>
            {rows()}
         </ul>
      </div>
   )
}

export default Course

