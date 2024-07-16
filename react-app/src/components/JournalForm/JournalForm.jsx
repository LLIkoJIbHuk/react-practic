import { useEffect, useReducer, useRef } from 'react';
import styles from './JournalForm.module.css';
import Button from '../Buttton/Button';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({onSubmit}) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  {/*Деструктурируем formState*/}
  const {isValid, isFormReadyToSubmit, values} = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  
  //Если не валиден, то поочередно фокусируемся
  const focusError = (isValid) => {
    switch(true){
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  {/*Очистка состояния, когда форма не валидна*/}
  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
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
      dispatchForm({type: 'CLEAR'});
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
  };

  {/*Проверка валидности формы (заполнение)*/}
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({type: 'SUBMIT'});
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <Input type='text' ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name='title' appearence="title" />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка календаря'/>
          <span>Дата</span>
        </label>
        <Input type='date' ref={dateRef} name='date' isValid={isValid.date} onChange={onChange} value={values.date} id="date"/>
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src='/folder.svg' alt='Иконка папки'/>
          <span>Метки</span>
        </label>
        <Input type='text'  id="tag" onChange={onChange} value={values.tag} name='tag'/>
      </div>
      
      <textarea name='post' ref={postRef} id='' onChange={onChange} value={values.post} cols='30' rows='10' className={cn(styles['input'], {
          [styles['invalid']] : !isValid.post
        })}></textarea>
      <Button text='Сохранить'/>
    </form>
  );
}

export default JournalForm;