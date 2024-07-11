import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
  {/* Создали состояние */}
  const [items, setItems] = useState([]);

  {/*Заставляем выполнить 1 раз во время появления компонента*/}
  useEffect(() => {
    {/*Если есть данные - парсим; устанавливаем item*/}
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItems(data.map(item => ({
        ...item,
        date: new Date(item.date)
      })));
  }
  }, []);

  {/* Функция для установки нового состояния */}
  const addItem = item => {
    setItems(oldItems => [...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
    }]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
    </div> 
  );
}

export default App;
