function SelectUser(changedUser) {

  const changeUser = (e) => {
    changedUser(e.target.value);
    console.log(e.target.value);
  };

  return (
      <select name="user" id="user" onChange={changeUser} >
        <option value="1">Пользователь1</option>
        <option value="2">Пользователь2</option>
      </select>
  );
}

export default SelectUser;