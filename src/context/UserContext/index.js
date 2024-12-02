import React, { createContext, useContext } from 'react';
import axios from "axios";
import bcrypt from "bcryptjs";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    const authenticated = async (login, password) => {
        try {
            const response = await axios.get('http://192.168.33.8:3000/users');
            const users = response.data;
            //console.log(users);
            const userFound = users.find((user) => user.login === login);
            if (userFound) {
                //console.log('JEST');
                return await bcrypt.compare(password, userFound.password);
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return false;
        }
    };

    return (
        <UserContext.Provider value={{ authenticated }}>
            {children}
        </UserContext.Provider>
    );
};
