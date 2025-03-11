import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, LogOut, Phone } from "lucide-react";
import { SiGoogle } from "react-icons/si";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function Account() {
  const { user, signInWithGoogle, signInWithPhone, verifyCode, signOut } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handlePhoneLogin = async () => {
    try {
      await signInWithPhone(phoneNumber);
      setShowVerification(true);
    } catch (error) {
      console.error("Phone login error:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode(verificationCode);
      setShowVerification(false);
    } catch (error) {
      console.error("Code verification error:", error);
    }
  };

  if (user) {
    return (
      <div className="container px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || "User"} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {user.displayName || "Space Explorer"}
                </h2>
                <p className="text-muted-foreground">{user.email || user.phoneNumber}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2" 
          onClick={signInWithGoogle}
        >
          <SiGoogle className="w-5 h-5" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {!showVerification ? (
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Phone number (e.g., +1234567890)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button 
              className="w-full gap-2" 
              onClick={handlePhoneLogin}
            >
              <Phone className="w-4 h-4" />
              Continue with Phone
            </Button>
            <div id="recaptcha-container" />
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleVerifyCode}
            >
              Verify Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}