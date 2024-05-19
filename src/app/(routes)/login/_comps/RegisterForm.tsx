import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const RegisterForm = () => {
    return <div className="mx-auto grid w-[350px] gap-6 p-5 md:p-0">
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-sm text-muted-foreground">
                Enter your email below to create an account
            </p>
        </div>
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Create Account
            </Button>
            <Button variant="outline" className="w-full">
                Continue with Google
            </Button>
        </div>
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login?state=login"className="underline">
                Sign in
            </Link>
        </div>
    </div>
}

export default RegisterForm