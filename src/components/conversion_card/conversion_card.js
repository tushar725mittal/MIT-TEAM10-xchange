import React, { Component } from 'react'
import './conversion_card.css'

export default class ConversionCard extends Component {
  render() {
    return (
      <div className='card-container' align="center">
        <div className='text-container'>
            <input type="number" placeholder='FROM'/>
            <select>
                <option>USD</option>
            </select>
        </div>
        <div className='text-container'>
            <input type="number" placeholder='TO'/>
            <select>
                <option>USD</option>
            </select>
        </div>
      </div>
    )
  }
}
