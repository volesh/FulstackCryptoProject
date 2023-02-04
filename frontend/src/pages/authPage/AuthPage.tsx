import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import scss from './auth.module.scss';

const AuthPage: FC = () => {
    return (
        <div className={scss.container}>
            <Outlet/>
        </div>
    );
};

export { AuthPage };
