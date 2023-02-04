import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout, StartLayout } from './layouts';
import { RequireAuth } from './hooks';
import { AuthPage, InfoPage } from './pages';
import { Header, LoginForm, RegisterForm } from './components';

const App: FC = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={''} element={<RequireAuth><MainLayout/></RequireAuth>}/>
                <Route path={'/info'} element={<StartLayout/>}>
                    <Route path={''} element={<InfoPage/>}/>
                    <Route path={'auth'} element={<AuthPage/>}>
                        <Route path={'login'} element={<LoginForm/>}/>
                        <Route path={'register'} element={<RegisterForm/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
