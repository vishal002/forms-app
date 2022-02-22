import { useState } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const { value: enteredName,
    isValid: enteredNameIsValid, 
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlureHandler: nameBlurHandler,
    reset: resetNameInput} = 
    useInput(value => value.trim() !== '');

  const [enterdEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState('');

  const enteredEmailIsValid = enterdEmail.includes('@');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    
    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };


  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text'
          id='name'
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name must not be empty</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-Mail</label>
        <input type='email'
          id='email'
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
          value={enterdEmail}
        />
        {emailInputIsInvalid && <p className='error-text'>Enter a valid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
