export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true
  },
  values: {
    post: '',
    title: '',
    date: '',
    tag: ''
  },
  isFormReadyToSubmit: false
};

{/*Сброс валидности*/}
export function formReducer(state, action) {
  switch(action.type){
    /* Установка значений */
    case 'SET_VALUE':
      return {...state, values: {...state.values, ...action.payload}};
    /* Убираем повторное срабатываение отправки - isFormReadyToSubmit: false */
    case 'CLEAR':
      return {...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false};
    /* Сброс валидности */
    case 'RESET_VALIDITY':
      return {...state, isValid: INITIAL_STATE.isValid};
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length;
      const postValidity = state.values.post?.trim().length;
      const dateValidity = state.values.date;
      return { 
        ...state,
        /* Храним состояние в state */
        values: action.payload,
        /* Ставим правильную валидность (замена if-else) */
        isValid: {
          post: postValidity,
          title: titleValidity,
          date: dateValidity
        },
        /* Готова к отправке при соблюдении всех условий */
        isFormReadyToSubmit: titleValidity && postValidity && dateValidity
      };
    }
  }
}