import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}) {

  return (
    <CardButton className="jouranl-add" onClick={clearForm}>
      <img src="/plus.png" alt="plus-button" /> Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;