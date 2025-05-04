
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  return (
    <Card className="w-full max-w-md mx-auto neumorph overflow-hidden">
      <Tabs 
        defaultValue="login" 
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 w-full rounded-none bg-background">
          <TabsTrigger 
            value="login"
            className="data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 rounded-none"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="register"
            className="data-[state=active]:shadow-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 rounded-none"
          >
            Register
          </TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="login" className="mt-0">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="mt-0">
            <RegisterForm />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
