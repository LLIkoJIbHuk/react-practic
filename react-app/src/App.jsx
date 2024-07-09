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
    // {
    //   id: 1,
    //   title: 'Подготовка к обновлению курсов',
    //   text: 'Горные походы открывают удивительные природные ландшафт',
    //   data: new Date()
    // },
    // {
    //   id: 2,
    //   title: 'Поход в годы',
    //   text: 'Думал, что очень много времени',
    //   data: new Date()
    // }
  ];

function App() {
  {/* Создали состояние */}
  const [items, setItems] = useState(INITIAL_DATA);

  {/* Функция для установки нового состояния */}
  const addItem = item => {
    setItems(oldItems => [...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: Math.max(...oldItems.map(i => i.id)) + 1
    }]);
  };

  const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

  let list = <p>Записей пока нет, добавьте первую</p>;
  if (items.length > 0){
    list = items.sort(sortItems).map(el => (
			<CardButton key={el.id}>
        <JournalItem
          title={el.title}
          text={el.text}
          date={el.date}
        />
      </CardButton>
    ));
  }

  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList>
          {list}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
    </div> 
  );
}

export default App;
