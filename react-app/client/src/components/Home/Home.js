import React, { useEffect, useState } from 'react';
import fapp from './base.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {
    fapp.auth().onAuthStateChanged(setCurrentUser);
	}, []);

	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
