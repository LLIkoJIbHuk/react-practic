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
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Items items={this.state.items} onAdd={this.addToOrder} />
        <Footer />
      </div>
    );
  }

  addToOrder(item) {
    this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;
