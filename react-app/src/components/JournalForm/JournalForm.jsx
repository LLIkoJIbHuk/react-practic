import { useState } from 'react';
import './JournalForm.css';
import Button from '../Buttton/Button';

function JournalForm() {
  const [inputData, setInputData] = useState('');
  const [state, setState] = useState({
    age: 31
  });

  const inputChange = (event) => {
    setInputData(event.target.value);
    console.log(inputData);
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    state.age = 40;
    setState({...state});
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };

  return (
    <form className='journal-form' onSubmit={addJournalItem}>
      {state.age}
      <input type='text' name='title' />
      <input type='date' name='date' />
      <input type='text' name='tag' value={inputData} onChange={inputChange} />{/* Отслеживаются изменения и записываются в состояние inputData */}
      <textarea name='post' id='' cols='30' rows='10'></textarea>
      <Button text='Сохранить' onClick={() => {console.log('Нажатие');}}/>
    </form>
  );
}

export default JournalForm;