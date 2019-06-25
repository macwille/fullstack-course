import React from 'react'
import Header from './Header'
import Content from './content/Content'


const Total = ({parts}) => {
   console.log('Total: ',parts)
   let sum = 0
   parts.forEach(element => {
       sum += element.exercises
   });

   return (
   <>
   <p>yhteensä {sum} tehtävää</p>
   </>
   )
} 


const Course = ({name, parts}) => {
    console.log('Course called: ', name, parts)
   return (
      <div>
          <Header name = {name}></Header>
          <Content parts = {parts}></Content>
      </div>
   )

}
export default Course