'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    email: z.string().min(2, { message: "Email must be at least 2 characters" }).email({ message: "Email must be valid" }),
    password: z.string().min(6, {
        message: "Email must be at least 6 characters"
    }).max(50, {
        message: "Password must be less than 50 characters"
    }),
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50, { message: "Username must be less than 16 characters" })
})

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const error = useSearchParams().get("error")
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            await axios.post('/api/auth/register', values).finally(() => setIsLoading(false)).then(() => {
                router.push(process.env.REDIRECT_AFTER_LOGIN || '/')
            })
        } catch (error: any) {
            setIsLoading(false);
            setError(error.response.data)
        }
    }

    async function handleGoogle() {
        setIsLoading(true)
        await signIn("google", { callbackUrl: process.env.REDIRECT_AFTER_LOGIN || '/' }).finally(() => setIsLoading(false));
    }
    return (
        <div className="mx-auto grid w-[350px] gap-6 p-5 md:p-0">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to create an account
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    <FormField disabled={isLoading}
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="dv0c" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField disabled={isLoading}
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="*****" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Create Account"}
                    </Button>
                    <Button onClick={handleGoogle} disabled={isLoading} type="button" variant="outline" className="w-full">
                        Continue with Google
                    </Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login?state=login" className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default RegisterForm