"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Define the form validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Define OTP validation schema

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    // Simulate API call to send verification code
    console.log("Password reset requested for:", data.email);
    setUserEmail(data.email);

    // In a real application, you would send this data to your API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsEmailSent(true);
  }

  // Handle OTP verification
  const verifyOTP = async () => {
    setIsVerifying(true);
    setOtpError("");

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if OTP is correct (123456)
    if (otpValue === "123456") {
      // Redirect to reset password page
      router.push("/reset-password");
    } else {
      setOtpError("Invalid verification code. Please try again.");
    }

    setIsVerifying(false);
  };

  return (
    <div className="container flex h-screen items-center justify-center py-8 mx-auto bg-GREY_15">
      <Card className="mx-auto w-full max-w-md border-GREY_30 hover:border-GREEN_60 transition-all duration-300">
        <CardHeader className="space-y-1">
          {!isEmailSent ? (
            <>
              <CardTitle className="text-2xl font-bold text-ABSOLUTE_WHITE">
                Reset your password
              </CardTitle>
              <CardDescription className="text-GREY_60">
                Enter your email address and we&apos;ll send you a verification
                code
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-bold text-ABSOLUTE_WHITE">
                Check your inbox
              </CardTitle>
              <CardDescription className="text-GREY_60">
                We&apos;ve sent a verification code to {userEmail}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {!isEmailSent ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <Button
                  type="submit"
                  className="w-full bg-GREEN_60 hover:bg-GREEN_70 text-ABSOLUTE_BLACK font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending code..." : "Send verification code"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-GREEN_60/10 mb-4">
                <Mail className="h-8 w-8 text-GREEN_60" />
              </div>
              <h3 className="text-lg font-medium text-ABSOLUTE_WHITE mb-2">
                Verification code sent
              </h3>
              <p className="text-GREY_60 mb-6">
                We&apos;ve sent a 6-digit verification code to your email.
                Please check your inbox and use the code to reset your password.
              </p>

              {/* OTP Input */}
              <div className="mb-6 mx-auto flex justify-center items-center flex-col">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                  className="gap-2 justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                    <InputOTPSlot
                      index={1}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                    <InputOTPSlot
                      index={2}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                  </InputOTPGroup>
                    <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                    <InputOTPSlot
                      index={4}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                    <InputOTPSlot
                      index={5}
                      className="border-GREY_30 focus:border-GREEN_60"
                    />
                  </InputOTPGroup>
                </InputOTP>
                {otpError && (
                  <p className="text-red-500 text-sm mt-2">{otpError}</p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-GREEN_60 hover:bg-GREEN_70 text-ABSOLUTE_BLACK font-medium transition-colors"
                  onClick={verifyOTP}
                  disabled={otpValue.length !== 6 || isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify code"}
                </Button>
                <div className="flex gap-3 flex-col">
                  <Button
                    variant="outline"
                    className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10 text-GREY_90 hover:text-GREEN_60 transition-all"
                    onClick={() => setIsEmailSent(false)}
                  >
                    Use a different email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-GREY_30 hover:border-GREEN_60 hover:bg-GREEN_60/10 text-GREY_90 hover:text-GREEN_60 transition-all"
                    onClick={() => onSubmit({ email: userEmail })}
                  >
                    Resend code
                  </Button>
                </div>
              </div>
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
  );
};

export default ForgotPasswordForm;
