"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(6, "Phone number is required"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  let router = useRouter();
  const fields: (keyof SignUpFormData)[] = [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "city",
    "postalCode",
  ];

  const prompts: Record<keyof SignUpFormData, string> = {
    name: "Please say your full name",
    email: "Say your email username, or say continue to use the default",
    password: "Please say your password",
    phone: "Please say your phone number",
    address: "Please say your address",
    city: "Please say your city",
    postalCode: "Please say your postal code",
  };

  const [voiceMode, setVoiceMode] = useState<boolean | null>(null);
  const [nameValue, setNameValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Loading accessibility options..."
  );

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const listen = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject("Speech recognition not supported");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        resolve(transcript);
      };

      recognition.onerror = (event: any) => {
        reject(event.error);
      };

      recognition.start();
      setIsListening(true);
      recognition.onend = () => setIsListening(false);
    });
  };

  const askBlindQuestion = async () => {
    try {
      if (!window.speechSynthesis) {
        throw new Error("Speech synthesis not available");
      }

      speak("Are you blind? Say blind or no.");
      setStatusMessage("Please say 'blind' or 'no'");

      const response = await listen();

      if (response === "blind") {
        setVoiceMode(true);
        setStatusMessage("Voice mode activated");
        speak("Voice mode activated. Let's begin the form.");
        startVoiceForm();
      } else {
        setVoiceMode(false);
        setStatusMessage("Please fill the form manually");
        speak("You can fill the form manually.");
      }
    } catch (error) {
      console.error("Error:", error);
      setVoiceMode(false);
      setStatusMessage("Please fill the form manually");
    }
  };

  const startVoiceForm = async () => {
    try {
      for (const field of fields) {
        setStatusMessage(`Please say your ${field}`);
        speak(prompts[field]);

        const transcript = await listen();

        if (field === "name") {
          const username = transcript.replace(/\s/g, "");
          setValue("name", transcript);
          setValue("email", `${username}@gmail.com`);
          setNameValue(username);
        } else if (field === "email") {
          if (transcript === "continue") {
            setValue("email", `${nameValue}@gmail.com`);
          } else {
            const clean = transcript.replace(/\s/g, "");
            setValue("email", `${clean}@gmail.com`);
          }
        } else {
          setValue(field, transcript);
        }
      }

      speak("Form completed. Say submit to submit the form.");
      const finalCommand = await listen();

      if (finalCommand === "submit") {
        handleSubmit(onSubmit)();
      }
    } catch (error) {
      console.error("Error in voice form:", error);
      setStatusMessage("Voice input failed. Please fill manually.");
      setVoiceMode(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      askBlindQuestion();
    }, 500);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // This clears all form fields
      setNameValue(""); // Reset the nameValue state
      if (voiceMode) {
        speak(
          "Form submitted and cleared. You can fill another form if needed."
        );
      }
    }
  }, [isSubmitSuccessful, reset, voiceMode]);

  const onSubmit = (data: SignUpFormData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("signupData", JSON.stringify(data));
    }

    console.log("Submitted:", data);
    if (voiceMode) {
      speak("Form submitted successfully!");
    }

    router.push("/shop");
  };

  const renderField = (
    label: string,
    id: keyof SignUpFormData,
    type = "text",
    placeholder = ""
  ) => (
    <div key={id}>
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        className={`w-full border ${
          errors[id] ? "border-red-500" : "border-gray-300"
        } dark:border-gray-700 rounded-lg px-4 py-2`}
        {...register(id)}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-2">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Create an Account
        </h2>

        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {isListening ? (
            <p className="text-blue-600 font-medium">Listening... Speak now</p>
          ) : (
            <p className={voiceMode ? "text-green-600 font-medium" : ""}>
              {statusMessage}
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {renderField("Full Name", "name")}
          {renderField("Email Address", "email", "email")}
          {renderField("Password", "password", "password")}
          {renderField("Phone Number", "phone")}
          {renderField("Address", "address")}
          {renderField("City", "city")}
          {renderField("Postal Code", "postalCode")}

          <Button type="submit" className="w-full bg-blue-500 text-white">
            Sign Up
          </Button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link className="underline" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
