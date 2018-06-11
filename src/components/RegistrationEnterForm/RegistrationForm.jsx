import React, {Component} from 'react';
import RegistrationFormErrors from './RegistrationFormErrors';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            formErrors: {email: '', password: '', existUser: ''},
            loginValid: false,
            emailValid: false,
            passwordValid: false,
        }
    }
    hahdleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    };

    validateField(fieldName, value) {
        // let {fieldValidationErrors, loginValid, emailValid, passwordValid} = this.state;
        let fieldValidationErrors = this.state.formErrors;
        let loginValid = this.state.loginValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'login':
                loginValid = value.match(/^[a-zA-Z]{4,}$/);
                fieldValidationErrors.login = loginValid ? '' : ':enter from 4 symbol for login';
                break;
            case 'email':
                emailValid = value.match(/^([-\w.]{4,})+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$/);
                fieldValidationErrors.email = emailValid ? '' : ':enter from 4 symbol for email_login';
                break;
            case 'password':
                passwordValid = value.match(/^(?=^.{4,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
                fieldValidationErrors.password = passwordValid ? '' : ':enter from 4 to 16 symbols for password';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            loginValid: loginValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        });
    }

    localStorageSetData = (e) => {
        e.preventDefault();
        if (this.state.loginValid && this.state.emailValid && this.state.passwordValid) {
            const newUser = {
                login: this.state.login,
                email: this.state.email,
                password: this.state.password,
            };
            const getDataUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];
            if (getDataUsers.some(obj => obj.email === newUser.email)) {
                this.setState({
                    formErrors: {
                        ...this.state.formErrors,
                        existUser: ':user already exists.'
                    }
                });
                return;
            }
            getDataUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(getDataUsers));
        }
    };

    render() {
        return (
            <form action="" className='registration' onSubmit={this.localStorageSetData}>
                <h3 className='registration__text'>Регистрация</h3>

                <RegistrationFormErrors formErrors={this.state.formErrors}/>

                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="name">
                        Login
                    </label>
                    <input type="text" required
                           className='registration__control'
                           name='login'
                           placeholder="login"
                           value={this.state.name}
                           onChange={this.hahdleUserInput}
                    />

                </div>
                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="email">
                        Email
                    </label>
                    <input type="email" required
                           className='registration__control'
                           name='email'
                           placeholder="mail@mail"
                           value={this.state.email}
                           onChange={this.hahdleUserInput}
                    />
                </div>
                <div className='registration__valid'>
                    <label className='registration__name'
                           htmlFor="password">
                        Password
                    </label>
                    <input type="password" required
                           className='registration__control'
                           name='password'
                           placeholder="....."
                           value={this.state.password}
                           onChange={this.hahdleUserInput}
                    />
                </div>
                <input type='submit'
                       className='registration__btn'
                       defaultValue="СОХРАНИТЬ"
                />
            </form>
        );
    }
}

export default RegistrationForm;