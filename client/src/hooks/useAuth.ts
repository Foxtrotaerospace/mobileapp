import { useState, useEffect } from "react";
import { 
  signInWithPopup,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  type User,
  type ConfirmationResult
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
        });
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error("Error signing in with phone:", error);
      throw error;
    }
  };

  const verifyCode = async (code: string) => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(code);
    } catch (error) {
      console.error("Error verifying code:", error);
      throw error;
    }
  };

  const signOut = () => auth.signOut();

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithPhone,
    verifyCode,
    signOut,
  };
}
