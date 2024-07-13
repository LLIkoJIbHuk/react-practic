import { useEffect, useReducer } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Buttton/Button';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({onSubmit}) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  {/*Деструктурируем formState*/}
  const {isValid, isFormReadyToSubmit, values} = formState;

  {/*Очистка состояния, когда форма не валидна*/}
  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({type: 'RESET_VALIDITY'});
      }, 2000);
    }
    return () => {
      {/*Очищается, когда исчезает из рендера | при повторном использовании*/}
      clearTimeout(timerId);
      {/*Предотверащает наложение эффектов друг на друга*/}
    };
  }, [isValid]);

  /*Если форма валидна, то отправляем состояние*/
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  {/*Проверка валидности формы (заполнение)*/}
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    /*Проверяем валидность через useReducer (отдельный файл js)*/
    dispatchForm({type: 'SUBMIT', payload: formProps});
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input type='text' name='title' className={cn(styles['input-title'], {
          [styles['invalid']] : !isValid.title
        })} />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка календаря'/>
          <span>Дата</span>
        </label>
        <input type='date' name='date' id="date" className={cn(styles['input'], {
          [styles['invalid']] : !isValid.date
        })}/>
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src='/folder.svg' alt='Иконка папки'/>
          <span>Метки</span>
        </label>
        <input type='text' id="tag" name='tag' className={styles['input']} />
      </div>
      
      <textarea name='post' id='' cols='30' rows='10' className={cn(styles['input'], {
          [styles['invalid']] : !isValid.post
        })}></textarea>
      <Button text='Сохранить'/>
    </form>
  );
}

export default JournalForm;