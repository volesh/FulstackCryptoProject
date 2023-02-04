import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps{
    children:ReactNode
}

const RequireAuth:FC<IProps> = ({ children }) => {
    if (!localStorage.getItem('userId')) {
        return (
            <Navigate to={'/info'}/>
        );
    }
    return (
        <>
            {children}
        </>
    );
};

export { RequireAuth };
