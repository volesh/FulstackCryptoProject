import React, { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { userService } from '../../services';
import scss from './register.module.scss';

import man2 from '../../photos/man2.png';
import { registerValidator } from '../../validators';

const RegisterForm: FC = () => {
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { isValid, errors }, getFieldState
    } = useForm({
        resolver: joiResolver(registerValidator),
        mode: 'all'
    });
    console.log(isValid, errors);
    const state = getFieldState('name');
    console.log(state);
    const submit = async (data: FieldValues):Promise<void> => {
        const value = {
            name: data.name, age: data.age, email: data.email, password: data.password, phone: data.phone
        };
        await userService.register(value).then((res) => res);
        navigate('/info/auth/login');
    };

    return (
        <>
            <div className={scss.formBlock}>
                <h3>
                    Реєстрація
                </h3>
                <form className={scss.form} onSubmit={handleSubmit(submit)}>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('name').invalid) ? scss.red : undefined}`} >
                        <input type="text" required={true} {...register('name')}/>
                        <span>Name</span>
                    </div>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('age').invalid) ? scss.red : undefined}`}>
                        <input type="number" required={true} {...register('age')}/>
                        <span>Age</span>
                    </div>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('email').invalid) ? scss.red : undefined}`}>
                        <input type="text" required={true} {...register('email')}/>
                        <span>Email</span>
                    </div>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('phone').invalid) ? scss.red : undefined}`}>
                        <input type="phone" required={true} {...register('phone')}/>
                        <span>Phone</span>
                    </div>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('password').invalid) ? scss.red : undefined}`}>
                        <input type="password" required={true} {...register('password')}/>
                        <span>Password</span>
                    </div>
                    <div className={`${scss.inputBlock} ${
                        (getFieldState('repeatPassword').invalid) ? scss.red : undefined}`}>
                        <input type="password" required={true} {...register('repeatPassword')}/>
                        <span>Repeat password</span>
                    </div>
                    <button disabled={!isValid} className={scss.button}>Register</button>
                </form>
                <p onClick={() => navigate('/info/auth/login')}>
                    Вже є акаунт? Увійти
                </p>
            </div>
            <div className={scss.imageBlock}>
                <img src={man2}/>
            </div>
        </>
    );
};

export { RegisterForm };
