import Image from "next/image"

import StateHandler from "./_comps/StateHandler"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import LoginImage from '../../../../public/assets/images/login_splash.jpg'

export default function page() {
    return (
        <>
            <Link href={'/'} className={cn('absolute top-5 left-3', buttonVariants({ variant: "ghost" }))}>
                <ArrowLeft size={20} className="mr-2" />
                Go back
            </Link>
            <div className="w-full lg:grid grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh]">
                <div className="flex items-center justify-center py-12">
                    <StateHandler />
                </div>
                <div className="hidden bg-muted lg:block">
                    <Image
                        src={LoginImage}
                        alt="Image"
                        width="1920"
                        height="1080"
                        placeholder="blur"
                        className="h-full w-full object-cover dark:brightness-[.5]"
                    />
                </div>
            </div>
        </>
    )
}
