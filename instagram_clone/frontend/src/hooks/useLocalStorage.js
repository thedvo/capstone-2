import { useState, useEffect } from 'react';

/** 
 Custom hook for keeping state data synced with localStorage.

when the item (in this case, we'll be saving the Token in localStorage. Can think of 'item' as token.) is changed, the useEffect runs.
    --> if the value of the item is null (meaning user logged out), it is removed from localStorage

    --> otherwise, if the item has value, update (setItem) localStorage with the (key, item)

 */
const useLocalStorage = (key, defaultValue = null) => {
	const INITIAL_STATE = localStorage.getItem(key) || defaultValue;
	const [item, setItem] = useState(INITIAL_STATE);

	useEffect(
		function setKeyInLocalStorage() {
			console.debug('hooks useLocalStorage useEffect', 'item=', item);

			if (item === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, item);
			}
		},
		[key, item]
	);

	return [item, setItem];
};

export default useLocalStorage;
