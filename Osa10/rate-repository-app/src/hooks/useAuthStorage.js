<<<<<<< HEAD
import { useContext } from 'react'; 
import AuthStorageContext from '../contexts/AuthStorageContext';
=======
import { useContext } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;