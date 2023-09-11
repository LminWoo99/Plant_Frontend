import { createContext, useState } from "react";

export const IdContext = createContext();

function IdProvider({ children }) {

	const [authId, setAuthId] = useState(localStorage.getItem(Number("id")));

	const value = {authId, setAuthId };

	return (
		<IdContext.Provider value = {value}>
			{children}
		</IdContext.Provider>
	);

}

export default IdProvider;