import React, { createContext, useState, useLayoutEffect, useContext, Fragment } from 'react';

import { TOKEN_STORAGE_KEY } from '../utils/consts';
import mainApiInstance from '../utils/MainApi';
import { AuthorizationContext } from './AuthorizationContext'
import Preloader from '../components/Preloader/Preloader';

const CurrentUserContext = createContext();

function CurrentUserContextProvider({ children }) {

    // Текущий контекст авторизаци { loggedIn, token }
    const { setAuthorizationContext } = useContext(AuthorizationContext);

    const [currentUser, setCurrentUser] = useState(null);

    ////////////////////////////////////////////////////////////////////
    // Регистрация и авторизация

    // Проверка токена
    const [tokenChecked, setTokenChecked] = useState(false);

    const tokenCheck = () => {
        const localToken = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (localToken) {
            mainApiInstance.getMe(localToken)
                .then(user => {

                    setAuthorizationContext({ loggedIn: true, token: localToken });
                    setCurrentUser(user);
                })
                .catch(error => {
                    //console.log(error);
                })
                .finally(() => {
                    setTokenChecked(true);
                });
            ;
        }
        else {
            setTokenChecked(true);
        }
    }

    useLayoutEffect(() => {
        tokenCheck(); // Проверить наличие токена 1 раз на старте
    }, []);

    return (

        <Fragment>
            {
                /* Дождемся выполнения useEffect=>tokenCheck  */
                tokenChecked ? (
                    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                        {children}
                    </CurrentUserContext.Provider >
                ) : (<Preloader />)
            }
        </Fragment>
    );
}

export { CurrentUserContext, CurrentUserContextProvider };
