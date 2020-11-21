import React from 'react';

const Warnings = props => {
  return (
    <div id='warnings'>
      {props.warnings.map(w => <div key={w} className='warning'>{w}</div>)}
    </div>
  )
}

export default Warnings;