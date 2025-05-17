"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import makeStore from "./config/store";
import { useAppSelector } from "./config/hook";
import Navbar from "../components/navbar";
import PublicNavbar from "../components/publicNav"; // Import your PublicNavbar
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react"; // For dark mode state



const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const { store, persistor } = makeStore();

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = !!user.id;
  const [darkmode, setDarkmode] = useState(false); // Dark mode state

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditional Navbar Rendering */}
      {isAuthenticated ? (
        <Navbar 
          darkmode={darkmode}
          setDarkmode={setDarkmode}
          // Pass other required props...
        />
      ) : (
        <PublicNavbar 
          // brandText="Welcome"
          darkmode={darkmode}
          setDarkmode={setDarkmode}
        />
      )}
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        )}
        
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthWrapper>
              {/* <SidebarTrigger /> */}
              {children}
            </AuthWrapper>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
