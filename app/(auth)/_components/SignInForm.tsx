"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Github, Mail } from "lucide-react"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"


// Define the form validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsLoading(true)

    // Simulate API call
    console.log("Login data submitted:", data)

    // In a real application, you would send this data to your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    // Redirect or show success message
  }

  // Handle social sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    // Implement Google authentication logic here
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    // Implement GitHub authentication logic here
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="container flex h-screen items-center justify-center py-8 mx-auto ">
      <Card className="mx-auto w-full max-w-md border-GREY_30 hover:border-GREEN_60 transition-all duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-ABSOLUTE_WHITE">Sign in to your account</CardTitle>
          <CardDescription className="text-GREY_60">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10 text-GREY_90 hover:text-GREEN_60 transition-all" 
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10 text-GREY_90 hover:text-GREEN_60 transition-all" 
                onClick={handleGithubSignIn} 
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-GREY_30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-GREY_60">Or continue with</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-GREY_90">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          className="border-GREY_30 focus:border-GREEN_60 focus:ring-GREEN_60/20" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-GREY_90">Password</FormLabel>
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

                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="border-GREY_30 data-[state=checked]:bg-GREEN_60 data-[state=checked]:border-GREEN_60" 
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-GREY_90">
                          Remember me
                        </FormLabel>
                      </div>
                      <div className="ml-auto">
                        <Link href="/forgot-password" className="text-sm text-GREEN_60 underline hover:text-GREEN_70 transition-colors">
                          Forgot password?
                        </Link>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-GREEN_60 hover:bg-GREEN_70 text-ABSOLUTE_BLACK font-medium transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-GREY_60">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-GREEN_60 underline hover:text-GREEN_70 transition-colors">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}