import { useState, useRef } from 'react';

const SimpleInput = (props) => {
  // useRef - once form is submitted, if you need value once
  const nameInputRef = useRef();
  // useState - instant validation every key strok
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };
  const formSubmissionHandler = event => {
    event.preventDefault();

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    console.log(enteredName);
    setEnteredName('');
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    // clearing input or updating form is bad practice
    // nameInputRef.current.value = ''
  };

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} />
        {!enteredNameIsValid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
