import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const StartLayout: FC = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export { StartLayout };
