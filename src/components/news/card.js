import { flexbox } from '@mui/system'
import React from 'react'

function card({title, id}) {
  
  return (
    <div style={{height:"50px", }}>
      <h2>title</h2>
      <div style={{display:'flex', flexGrow:1, justifyContent:"space-between"}}>
          <button>Edit</button>
          <button>Delete</button>
      </div>
    </div>
  )
}

export default card
