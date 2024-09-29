import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Cookies from 'js-cookie';
import { logout } from '@/lib/utils'
import { app } from 'src/firebase/client'
import { navigate } from 'astro:transitions/client'
import { log } from 'node_modules/astro/dist/core/logger/core'

const firebaseConfig = {
    apiKey: "AIzaSyAWY7JVT8SXo0_ROK1wRO5aw55cs1iBcsA",
    authDomain: "shellhacks-go.firebaseapp.com",
    projectId: "shellhacks-go",
    storageBucket: "shellhacks-go.appspot.com",
    messagingSenderId: "1037212198068",
    appId: "1:1037212198068:web:b3541842a649dc87b6a3e1"
};

// Initialize Firebase
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export default function FirebaseAuthComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            Cookies.set('uid', currentUser?.uid ?? '')
            Cookies.set('email', currentUser?.email ?? '')
            Cookies.set('displayName', currentUser?.displayName ?? '')
            Cookies.set('photoURL', currentUser?.photoURL ?? '')
            console.log('UID:', currentUser?.uid)
            console.log('user:', user)
            // if (currentUser?.uid)
            //     if (!isNewUser)
            //         navigate('/onboarding')
            //     else (navigate('/dashboard'))
        });
        return () => unsubscribe()
    }, [])

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Creating account');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            // Check if the user is new by comparing createdAt and lastLoginAt
            const createdAt = userCredential.user.metadata.creationTime;
            const lastLoginAt = userCredential.user.metadata.lastSignInTime;
            const isNewUser = createdAt === lastLoginAt;

            if (isNewUser) {
                await postUser(userCredential.user)
                console.log("New user detected, performing onboarding");
                navigate('/onboarding');
            } else {
                console.log("Existing user detected, navigating to dashboard");
                navigate('/dashboard');
            }

            setError(null);
        } catch (error) {
            setError('Failed to create an account');
            console.error(error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Check if the user is new by comparing createdAt and lastLoginAt
            const createdAt = userCredential.user.metadata.creationTime;
            const lastLoginAt = userCredential.user.metadata.lastSignInTime;
            const isNewUser = createdAt === lastLoginAt;

            if (isNewUser) {
                await postUser(userCredential.user)
                console.log("New user detected, performing onboarding");
                navigate('/onboarding');
            } else {
                console.log("Existing user detected, navigating to dashboard");
                navigate('/dashboard');
            }

            setError(null);
        } catch (error) {
            setError('Failed to log in');
            console.error(error);
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);

            // Check if the user is new by comparing createdAt and lastLoginAt
            const createdAt = userCredential.user.metadata.creationTime;
            const lastLoginAt = userCredential.user.metadata.lastSignInTime;
            const isNewUser = createdAt === lastLoginAt;

            if (isNewUser) {
                await postUser(userCredential.user)
                console.log("New Google user detected, performing onboarding");
                navigate('/onboarding');
            } else {
                console.log("Existing Google user detected, navigating to dashboard");
                navigate('/dashboard');
            }

            setError(null);
        } catch (error) {
            setError('Failed to sign in with Google');
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            logout(app)
            console.log('Logged out')
        } catch (error) {
            console.error('Failed to log out', error)
        }
    }

    async function postUser(user: User) {
        // console.log('Creating user')
        try {
            console.log('in post user')
            console.log(user)
            const res = await fetch('http://3.147.36.237:3000/api/user/see-user', {
                method: 'POST',
                body: JSON.stringify(user)
            })
            res.status === 200 ? console.log('User created') : console.error('Failed to create user')
        } catch (error) {
            console.error('Failed to create user', error)
        }

        return
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Firebase Authentication</CardTitle>
                <CardDescription>Login or create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                {user ? (
                    <div className="text-center">
                        <p className="mb-4">Welcome, {user.email}!</p>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Tabs defaultValue="login">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="login-password">Password</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Login</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Sign Up</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                )}
                {!user && (
                    <>
                        <Separator className="my-4" />
                        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                            Sign in with Google
                        </Button>
                    </>
                )}
            </CardContent>
            <CardFooter>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardFooter>
        </Card>
    )
}