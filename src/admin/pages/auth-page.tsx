// No major changes needed, just ensuring schema consistency
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lock, 
  User, 
  Zap,
  LogIn,
  TerminalSquare,
  Fingerprint,
  Layers
} from "lucide-react";

// Use the same schema as before, adjusted for clarity
const authSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function AuthPage() {
  const [loginAnimation, setLoginAnimation] = useState(false);
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoginAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const loginForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof authSchema>) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = async (values: z.infer<typeof authSchema>) => {
    registerMutation.mutate(values);
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#0A1533] flex items-center justify-center overflow-hidden relative p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-3xl -top-64 -left-64 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-indigo-600/10 to-purple-400/10 blur-3xl -bottom-64 -right-64 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#00BFFF]/20 blur-3xl top-1/4 left-1/3 animate-blob"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#2C56C7]/20 blur-3xl bottom-1/4 right-1/3 animate-blob" style={{animationDelay: '2s'}}></div>
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTM2OGIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      
      <Card 
        className={`w-full max-w-md bg-[#121f42]/90 backdrop-blur-sm border-[#1e3a8a] text-white shadow-2xl rounded-xl overflow-hidden transition-all duration-700 ease-in-out ${loginAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="h-1 bg-gradient-to-r from-[#00BFFF] via-[#4F46E5] to-[#0073e6]"></div>
        
        <CardHeader className="text-center space-y-1 pb-2">
          <div className="mx-auto relative">
            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#172554] flex items-center justify-center shadow-lg transition-all duration-1000 ease-out ${loginAnimation ? 'scale-100 rotate-0' : 'scale-50 rotate-45'}`}>
              <Layers className={`h-8 w-8 text-[#00BFFF] transition-all duration-1000 ${loginAnimation ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            
            {/* Animated circles */}
            <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00BFFF] to-[#0073e6] opacity-50 blur-sm transition-all duration-1000 ${loginAnimation ? 'animate-pulse' : 'opacity-0'}`}></div>
          </div>
          
          <CardTitle className={`text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00BFFF] mt-3 transition-all duration-700 delay-300 ${loginAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            API Admin Portal
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-5 px-8">
          <div className="mb-6 flex items-center justify-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#0073e6] flex items-center justify-center">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Admin Login</h2>
          </div>
          
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-[#00BFFF] group-focus-within:text-white transition-colors" />
                        </div>
                        <Input 
                          placeholder="Enter administrator username" 
                          className="pl-10 bg-[#0c1529]/80 border-[#283a5e] focus-visible:ring-[#00BFFF] focus-visible:border-[#00BFFF] text-white rounded-lg transition-all" 
                          {...field}
                        />
                        <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 bg-gradient-to-r from-[#00BFFF]/10 to-transparent pointer-events-none transition-opacity"></div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-4 w-4 text-[#00BFFF] group-focus-within:text-white transition-colors" />
                        </div>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          className="pl-10 bg-[#0c1529]/80 border-[#283a5e] focus-visible:ring-[#00BFFF] focus-visible:border-[#00BFFF] text-white rounded-lg transition-all" 
                          {...field}
                        />
                        <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 bg-gradient-to-r from-[#00BFFF]/10 to-transparent pointer-events-none transition-opacity"></div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full bg-gradient-to-r from-[#00BFFF] to-[#0073e6] hover:from-[#00a6e6] hover:to-[#0064c8] shadow-lg shadow-blue-900/30 text-white py-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-4"
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <Fingerprint className="mr-2 h-5 w-5" /> Sign In to Admin Portal
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="text-center text-xs text-gray-400 pt-1 pb-5 px-6 opacity-80">
          <div className="flex items-center justify-center">
            <Zap className="h-3 w-3 mr-1 text-[#00BFFF]" />
            <span>Softtouch API Management System</span>
          </div>
        </CardFooter>
      </Card>
      
      {/* Floating element */}
      <div className={`fixed bottom-8 right-8 bg-[#172554]/50 backdrop-blur-md p-3 rounded-lg shadow-lg border border-[#00BFFF]/20 transition-all duration-700 ease-in-out ${loginAnimation ? 'translate-y-0 opacity-80' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center space-x-2 text-white">
          <TerminalSquare className="h-5 w-5 text-[#00BFFF]" />
          <span className="text-sm">Secure API Portal v2.0</span>
        </div>
      </div>
    </div>
  );
}