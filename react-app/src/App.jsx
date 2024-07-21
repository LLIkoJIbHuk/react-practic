import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContext } from './context/user.context';

function mapItems(items){
  if(!items){
    return [];
  } 
  return items.map(i => ({
      ...i,
      date: new Date(i.date)
    }));
}

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

  {/*Устанавливаем item по ключу data, передаем строку*/}
  useEffect(() => {
    if(items.length){
      console.log('Запись');
      localStorage.setItem('data', JSON.stringify(items));
    }
  }, [items]);
  {/*Проверка делается только внутри хука*/}

  {/* Функция для установки нового состояния */}
  const addItem = item => {
    setItems([...mapItems(items), {
      post: item.post,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
    }]);
  };

  return (
    <UserContext.Provider value={{userId: 2}} >
      <div className='app'>
        <LeftPanel>
          <Header/>
          <JournalAddButton/>
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem}/>
        </Body>
      </div> 
    </UserContext.Provider>
  );
}

export default App;
