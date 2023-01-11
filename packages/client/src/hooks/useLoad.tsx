import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import storeChat from '../stores/chatStore';
import storeLogin from '../stores/loginStore';
import storeUser from '../stores/userStore';

export default function useLoad() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loginStore = storeLogin();
  const chatStore = storeChat();
  const userStore = storeUser();

  useEffect(() => {
    const f = async () => {
      const logged = await loginStore.authIsLogged();
      if (logged) {
        await userStore.init();
        await chatStore.init();
        setLoading(false);
      } else setError("User not logged");
    }
    f();
  }, [])

  return {
    loading,
    error,
  }
}
