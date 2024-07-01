import './App.css';
import Button from './components/Buttton/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {

  const data = [
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

  const inputChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalList>
          <JournalAddButton/>
          <CardButton>
            <JournalItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
            title={data[1].title}
            text={data[1].text}
            date={data[1].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        <input type='text' onChange={inputChange} />
      </Body>
      <Button/>
    </div> 
  );
}

export default App;
