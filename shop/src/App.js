import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Items from "./components/Items"
import Categories from "./components/Categories"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Товар 1',
          img:'pr1.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'chairs',
          price: '49.99'
        },
        {
          id: 2,
          title: 'Товар 2',
          img:'pr2.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'tables',
          price: '49.99'
        },
        {
          id: 3,
          title: 'Товар 3',
          img:'pr3.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'light',
          price: '49.99'
        },
        {
          id: 4,
          title: 'Товар 4',
          img:'pr1.png',
          desc: 'Lorem ipsum dolor sit amet.',
          category: 'sofa',
          price: '49.99'
        },
      ]
    }
    this.state.currentItems = this.state.items //изначально помещаем все элементы, которые находятся в массиве items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
  }
  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Categories chooseCategory={this.chooseCategory} />
        <Items items={this.state.currentItems} onAdd={this.addToOrder} />
        <Footer />
      </div>
    );
  }

  chooseCategory(category){
    if(category === 'all'){
      this.setState({currentItems: this.state.items}) //вывод всех категорий
      return
    }

    this.setState({
      currentItems: this.state.items.filter(el => el.category === category) //фильтрация массива items через массив currentItems
    })
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
