import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Items from "./components/Items"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      items: [
        {
          id: 1,
          title: 'Товар 1',
          img:'pr1.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'ex',
          price: '49.99'
        },
        {
          id: 2,
          title: 'Товар 2',
          img:'pr2.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'ex',
          price: '49.99'
        },
        {
          id: 3,
          title: 'Товар 3',
          img:'pr3.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'ex',
          price: '49.99'
        },
      ]
    }
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
  }
  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Items items={this.state.items} onAdd={this.addToOrder} />
        <Footer />
      </div>
    );
  }

  deleteOrder(id){
    this.setState({orders: this.state.orders.filter(el => el.id !== id)}) //добавляем в массив элементы, id которых не совпадает с удаленными
  }

  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
        isInArray = true //проверка на повтор id
    })
    if(!isInArray) //если нет текущего элемента в массиве
      this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;
