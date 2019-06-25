import React from 'react'

const Part = (props) => {
   console.log('Part called')
   return (
       <>
       {props.name} {props.ex}
       </>
   )
}

export default Part