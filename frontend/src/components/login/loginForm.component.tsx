import React, { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import scss from './login.module.scss';
import man1 from '../../photos/man1.png';
import { authService } from '../../services';

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { isValid } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const submit = async (value: FieldValues) => {
        const user = await authService.login(value).then(({ data }) => data).catch(({ response }) => {
            setError(response.data.errorMessage);
        });
        if (user) {
            localStorage.setItem('accessToken', user.tokens.accessToken);
            localStorage.setItem('refreshToken', user.tokens.refreshToken);
            localStorage.setItem('userId', user.user._id);
            setError(null);
            navigate('/');
        }
    };
    return (
        <>
            <div className={scss.imageBlock}>
                <img src={man1}/>
            </div>
            <div className={scss.formBlock}>
                <h3>
                    Логін
                </h3>
                <form className={scss.form} onSubmit={handleSubmit(submit)}>
                    <div>
                        <div className={scss.inputBlock}>
                            <input type="text" required={true} {...register('email')}/>
                            <span>Email</span>
                        </div>
                        <div className={scss.inputBlock}>
                            <input type="password" required={true} {...register('password')}/>
                            <span>Password</span>
                        </div>
                    </div>
                    {error && <div style={{ color: 'red', fontStyle: 'italic' }}>Invalid email or password</div>}
                    <button disabled={ !isValid } className={scss.button}>LogIn</button>
                </form>
                <p onClick={() => navigate('/info/auth/register')}>Створити акаунт</p>
            </div>
        </>
    );
};

export { LoginForm };
