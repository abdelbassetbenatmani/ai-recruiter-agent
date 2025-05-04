"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

// Define the form validation schema using Zod
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormValues = z.infer<typeof formSchema>

const ReasetPasswordForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsLoading(true)

    // Simulate API call
    console.log("Password reset data:", data)

    // In a real application, you would send this data to your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSuccess(true)
    
    // Redirect to sign-in page after 2 seconds
    setTimeout(() => {
      router.push("/sign-in")
    }, 2000)
  }

  return (
    <div className="container flex h-screen items-center justify-center py-8 mx-auto">
      <Card className="mx-auto w-full max-w-md border-GREY_30 hover:border-GREEN_60 transition-all duration-300">
        <CardHeader className="space-y-1">
          {!isSuccess ? (
            <>
              <CardTitle className="text-2xl font-bold text-ABSOLUTE_WHITE">Create new password</CardTitle>
              <CardDescription className="text-GREY_60">
                Your new password must be different from previously used passwords
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-bold text-ABSOLUTE_WHITE">Password reset successful</CardTitle>
              <CardDescription className="text-GREY_60">
                Your password has been reset successfully
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-GREY_90">New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="border-GREY_30 focus:border-GREEN_60 focus:ring-GREEN_60/20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-GREY_60">
                        Password must be at least 8 characters and include uppercase, lowercase, number, and special
                        character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-GREY_90">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="border-GREY_30 focus:border-GREEN_60 focus:ring-GREEN_60/20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-GREEN_60 hover:bg-GREEN_70 text-ABSOLUTE_BLACK font-medium transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting password..." : "Reset password"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-GREEN_60/10 mb-4">
                <Check className="h-8 w-8 text-GREEN_60" />
              </div>
              <h3 className="text-lg font-medium text-ABSOLUTE_WHITE mb-2">
                Password reset complete
              </h3>
              <p className="text-GREY_60 mb-6">
                Your password has been reset successfully. You will be redirected to the sign-in page shortly.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-GREY_60">
            <Link
              href="/sign-in"
              className="text-GREEN_60 underline hover:text-GREEN_70 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ReasetPasswordForm