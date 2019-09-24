import React from 'react';
import { Form, Field } from 'react-final-form'
import validator from 'validator';
import API from '../utils/Api';

async function sendEmail(callback){
    try {
        const response = await API.get("/email");
        let status = response.data.status;
        if(status===200){
            sent="succes";
            callback();
        }else{
            sent="error";
        };
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
}

var sent =  null;

const onSubmit = (values, formApi, callback) => { 
    const valid = (values.email ? validator.isEmail(values.email) : false) &&
    (values.name ? !validator.isEmpty(values.name) : false) &&
    (values.phone ? !validator.isEmpty(values.phone) : false) &&
    (values.postcode ? !validator.isEmpty(values.postcode) : false) &&
    (values.city ? !validator.isEmpty(values.city) : false) &&
    (values.street ? !validator.isEmpty(values.street) : false) &&
    (values.house ? !validator.isEmpty(values.house) : false) || false ;
    if(valid){
        sendEmail(callback);
    }else{
        sent="error";
        callback();
    }
};

const validate = (values) => {
   //nothing to do
   if(values.checkall){
        all = {checked: true};
   }else{
        all = {};
   }
};
var all = {};

const MyForm = (props) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, pristine, invalid, form, values }) => (
      <form onSubmit={handleSubmit}>
        <h2>WYPEŁNIJ FORMULARZ</h2>
        <div className="form-texts">
          <Field name="name" component="input" placeholder="*Imię i nazwisko"/>
          <Field name="email" type="email" component="input" placeholder="*E-mail"/>
          <Field name="phone" type="tel" pattern="[0-9\s+-]{0,}" component="input" placeholder="*Nr Telefonu"/>
          <Field name="postcode" component="input" placeholder="*Kod pocztowy"/>
          <Field name="city" component="input" placeholder="*Miejscowość"/>
          <Field name="street" component="input" placeholder="*Ulica"/>
          <Field name="house" component="input" placeholder="*Nr domu"/>
          <Field name="local" component="input" placeholder="Nr lokalu" />
        </div>
        <div className="form-checks">
            <p>*pola wymagane</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div>
                <Field id="check1" name="first" component="input" type="checkbox" {...all}/>
                <label htmlFor="check1" >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.</label>
            </div>
            <div>    
                <Field id="check2" name="second" component="input" type="checkbox" {...all}/>
                <label htmlFor="check2" >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia</label>
            </div>
            <div>    
                <Field id="check3" name="third" component="input" type="checkbox" {...all}/>
                <label htmlFor="check3" >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</label>
            </div>
            <div>    
                <Field id="check4" name="checkall" component="input" type="checkbox"/>
                <label htmlFor="check4" >Zaznacz wszystko</label>
            </div>

        </div>
                  
        <button type="submit" disabled={pristine || invalid}>
          Wyślij formularz
        </button>
        <span className="form-status">{sent==="succes" ? "successfully sent !!!" : null }</span>  
        <span className="form-error">{sent==="error" ? "fill in the fields correctly !" : null}</span>  
      </form>
    )}
  />
);

export default  MyForm;