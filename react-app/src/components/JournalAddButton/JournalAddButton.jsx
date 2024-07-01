import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton() {

  return (
    <CardButton className="jouranl-add">
      <img src="/plus.png" alt="plus-button" /> Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;