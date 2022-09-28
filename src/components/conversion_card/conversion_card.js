import React, { Component } from 'react'
import './conversion_card.css'

export default class ConversionCard extends Component {
  render() {
    return (
      <div className='card-container' align="center">
        <div className='text-container-1'>
            <input className='input-field' type="number" placeholder='FROM'/>
            <select className='currency-selector'>
                <option>USD</option>
            </select>
        </div>
        <div className='text-container-2'>
            <input className='input-field' type="number" placeholder='TO'/>
            <select className='currency-selector'>
                <option>USD</option>
            </select>
        </div>
      </div>
    )
  }
}
