import { useEffect, useState } from "react";
import { Gift, Send, Calendar, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EidGreetingSection = () => {
  const [greeting, setGreeting] = useState("");
  const [recipient, setRecipient] = useState("");
  const [template, setTemplate] = useState("template1");
  const [showPreview, setShowPreview] = useState(false);

  const eidDate = new Date("2025-03-31T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = eidDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const templates = {
    template1:
      "May the blessings of Allah fill your life with happiness and open all the doors of success now and always.",
    template2:
      "Wishing you and your family a blessed Eid filled with joy, peace, and prosperity.",
    template3:
      "On this special day, may Allah bless you with good health, happiness, and success.",
  };

  const handleTemplateChange = (value) => {
    setTemplate(value);
    setGreeting(templates[value]);
  };

  const handleCreateGreeting = () => {
    setShowPreview(true);
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-blue-50 rounded-lg to-white">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full">
            <Moon className="h-6 w-6 text-[#0E82FD]" />
            <Star className="h-5 w-5 text-[#0E82FD] ml-1" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-[#007bff] md:text-4xl">
            Eid Mubarak from Care Matrix
          </h2>
          <p className="max-w-[700px] text-gray-700 md:text-xl">
            Celebrate this blessed occasion with your loved ones. Create and
            share personalized Eid greetings with our easy-to-use generator.
          </p>
          <div className="flex flex-col items-center justify-center space-y-2 text-base">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-[#0E82FD]" />
              <span className="font-medium text-[#007bff]">
                {timeLeft.days} days, {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
                {timeLeft.seconds}s Until, <strong>Eid al-Fitr</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Card className="pt-4 pb-5 rounded-lg border-blue-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#007bff] text-lg font-medium">
                Create Your Eid Greeting
              </CardTitle>
              <CardDescription className={"font-medium -mt-1"}>
                Personalize your message and share it with friends and family
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Name</Label>
                <Input
                  id="recipient"
                  placeholder="Enter Recipient's name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Choose a Template</Label>
                <Select
                  onValueChange={handleTemplateChange}
                  defaultValue={template}
                  className={"w-full"}
                >
                  <SelectTrigger className="border-blue-200 w-full">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent className={"w-full"}>
                    <SelectItem value="template1">
                      Blessings Template
                    </SelectItem>
                    <SelectItem value="template2">
                      Family Wishes Template
                    </SelectItem>
                    <SelectItem value="template3">
                      Health & Success Template
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="greeting">Your Greeting</Label>
                <Textarea
                  id="greeting"
                  placeholder="Type your Eid greeting here"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="min-h-[120px] border-blue-200 focus:border-blue-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateGreeting}
                className="w-full bg-[#0E82FD] cursor-pointer hover:bg-blue-700"
              >
                <Gift className="mr-2 h-4 w-4" />
                Create Greeting
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col space-y-6">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className={"cursor-pointer"}>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="share" className={"cursor-pointer"}>
                  Share Options
                </TabsTrigger>
              </TabsList>
              {/* Eid Greetings */}
              <TabsContent value="preview" className="mt-4 rounded-lg">
                <Card
                  className={`border-blue-100 shadow-md overflow-hidden rounded-lg ${
                    !showPreview && "opacity-70"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white z-0"></div>
                    <div className="relative z-10 py-6 px-4 md:px-8 lg:px-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <Moon className="h-8 w-8 text-[#0055ff]" />
                      </div>

                      <div className="space-y-2 text-center">
                        <h3 className="text-2xl font-bold text-[#0055ff]">
                          Eid Mubarak!
                        </h3>
                        {recipient && (
                          <p className="text-lg text-black font-semibold">
                            Dear {recipient},
                          </p>
                        )}
                        <p className="text-gray-950 font-medium">
                          {greeting ||
                            "Your personalized greeting will appear here."}
                        </p>
                        <p className="text-sm text-gray-900">
                          Warm wishes from Care Matrix Healthcare
                        </p>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              {/* Share Greetings */}
              <TabsContent value="share" className="mt-4">
                <Card className="border-blue-100 shadow-md py-5 rounded-lg">
                  <CardHeader>
                    <CardTitle className="text-[#007bff]">
                      Share Your Greeting
                    </CardTitle>
                    <CardDescription className={"-mt-1"}>
                      Send your Eid wishes to friends and family
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="email"
                          placeholder="recipient@example.com"
                          className="border-blue-200"
                        />
                        <Button
                          variant="outline"
                          className="border-blue-200 text-blue-600 cursor-pointer"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-600 cursor-pointer duration-300"
                      >
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-600 cursor-pointer duration-300"
                      >
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Tweet
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-200 text-blue-600 cursor-pointer duration-300"
                      >
                        <svg
                          className="h-5 w-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {/*  Healthcare During Eid */}
            <Card className="border-blue-100 shadow bg-blue-50/10 border py-4 rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#007bff] text-lg">
                  Healthcare During Eid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm -mt-8 mb-1 text-gray-600">
                  Care Matrix remains committed to providing exceptional
                  healthcare services throughout the Eid holiday. Our emergency
                  services will be available 24/7, and we have special holiday
                  schedules for routine appointments.
                </p>
                <Button
                  variant="link"
                  className="text-[#0E82FD] p-0 h-auto mt-2"
                >
                  View Holiday Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              Explore More Eid Activities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EidGreetingSection;
