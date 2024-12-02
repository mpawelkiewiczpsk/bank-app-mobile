import React, {createContext, useContext, useState} from 'react';
import axios from "axios";
import bcrypt from "bcryptjs";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState();
    const authenticated = async (login, password) => {
        try {
            const response = await axios.get('http://192.168.33.8:3000/users');
            const users = response.data;
            //console.log(users);
            const userFound = users.find((user) => user.login === login);
            if (userFound) {
                //console.log('JEST');
                setUserId(userFound.id)
                return await bcrypt.compare(password, userFound.password);
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return false;
        }
    };

    const getBalance = async () => {
        try {
            const response = await axios.get('http://192.168.33.8:3000/accounts');
            //console.log(response.data);
            // TODO rachunek jest wybierany na podstawie id usera (wyzej w authenticated), brak wyboru samego rachunku
            const userBalance = response.data.find((account) => account.userId === userId);
            console.log(userBalance)
            if (userBalance) {
                console.log('User balance:', userBalance.balance);
                return userBalance.balance;
            } else {
                console.error('Account not found for the given userId');
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }

    }

    return (
        <UserContext.Provider value={{ authenticated, getBalance }}>
            {children}
        </UserContext.Provider>
    );
};
