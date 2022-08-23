import { useState } from 'react';

const useProfileState = (userState) => {
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);

  const [isProfileNameSame, setIsProfileNameSame] = useState(false);
  const [isProfileEmailSame, setIsProfileEmailSame] = useState(false);

  const handleStateChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    name === 'profileFormNameInput' && value === userState.name ? setIsProfileNameSame(false) : setIsProfileNameSame(true);
    name === 'profileFormEmailInput' && value === userState.email ? setIsProfileEmailSame(false) : setIsProfileEmailSame(true);
  };

  return { isProfileNameSame, isProfileEmailSame, handleStateChange, isProfileEditMode, setIsProfileEditMode };
};

export default useProfileState;
