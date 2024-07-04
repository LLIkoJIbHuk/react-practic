import { useState } from 'react';
import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

const INITIAL_DATA = [
    {
      title: 'Подготовка к обновлению курсов',
      text: 'Горные походы открывают удивительные природные ландшафт',
      data: new Date()
    },
    {
      title: 'Поход в годы',
      text: 'Думал, что очень много времени',
      data: new Date()
    }
  ];

function App() {
  {/* Создали состояние */}
  const [items, setItems] = useState(INITIAL_DATA);

  {/* Функция для установки нового состояния */}
  const addItem = item => {
    setItems(oldItems => [...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date)
    }]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList>
          {items.map(el => (
            <CardButton>
              <JournalItem
                title={el.title}
                text={el.text}
                date={el.date}
              />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
    </div> 
  );
}

export default App;
