
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { signIn, signUp, isLoading, authError, clearAuthError } = useAuth();
  const { toast } = useToast();

  // Clear errors when switching between sign in and sign up
  useEffect(() => {
    setPasswordError('');
    clearAuthError();
  }, [isSignIn, clearAuthError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (!isSignIn && password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (!isSignIn) {
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      }
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignIn 
                ? 'Enter your email and password to sign in' 
                : 'Create a new account to get started'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {!isSignIn && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              
              {passwordError && (
                <p className="text-sm font-medium text-destructive">{passwordError}</p>
              )}
              
              {authError && (
                <p className="text-sm font-medium text-destructive">{authError}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
                    {isSignIn ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  isSignIn ? 'Sign In' : 'Create Account'
                )}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                className="w-full" 
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
