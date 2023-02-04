import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import scss from './header.module.scss';

const Header:FC = () => {
    const isLogin = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        navigate('/info');
    };

    return (
        <div className={scss.header}>
            {isLogin
                ? <div className={scss.headerContent}>
                    <div>Logo</div>
                    <div>
                        <button onClick={logOut} className={scss.btn}> Вийти </button>
                    </div>
                </div>
                : <div className={scss.headerContent}>
                    <div>Logo</div>
                    <div>
                        <button onClick={() => navigate('/info/auth/login')} className={scss.btn}> Вхід </button>
                    </div>
                </div>
            }
        </div>
    );
};

export { Header };
