import React, { Component } from 'react'

export class Categories extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [
        {
          key: 'all',
          name: 'Всё'
        },
        {
          key: 'chairs',
          name: 'Стулья'
        },
        {
          key: 'tables',
          name: 'Столы'
        },
        {
          key: 'sofa',
          name: 'Диваны'
        },
        {
          key: 'light',
          name: 'Светильники'
        }
      ]
    }
  }

  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el =>( //перебор всех категорий
          <div key={el.key}> {el.name} </div>
        ))}
      </div>
    )
  }
}

export default Categories