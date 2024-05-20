'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    email: z.string().min(2, { message: "Email must be at least 2 characters" }).email({ message: "Email must be valid" }),
    password: z.string().min(6, {
        message: "Email must be at least 6 characters"
    }).max(50, {
        message: "Password must be less than 50 characters"
    })
})

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const error = useSearchParams().get("error")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                callbackUrl: "/dashboard",
            }).finally(() => setIsLoading(false))
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    async function handleGoogle() {
        setIsLoading(true)
        await signIn("google", { callbackUrl: process.env.REDIRECT_AFTER_LOGIN || '/' }).finally(() => setIsLoading(false));
    }
    return <div className="mx-auto grid w-[350px] gap-6 p-5 md:p-0">
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" {...field} />
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
                            <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Sign in"}
                </Button>
                <Button onClick={handleGoogle} variant="outline" className="w-full">
                    Continue with Google
                </Button>
            </form>
        </Form>
        <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/login?state=register" className="underline">
                Sign up
            </Link>
        </div>
    </div>
}

export default LoginForm