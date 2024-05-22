import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "../components/Utility/Navbar";
import SignIn from "./signIn/SignIn";
import SetPassword from "./setPassword/SetPassword";
import Regester from "./regester/Regester";
import ContactsTable from "@/components/Home/contacts/ContactsTable";
import ExportViaEmail from "@/components/Home/contacts/ExportViaEmail";
import Footer from "@/components/Utility/Footer";
import UsersTable from "@/components/Home/users/UsersTable"; 
import CreateNewContact from "@/components/Home/contacts/CreateNewContact";
import InviteNewUser from "@/components/Home/users/InviteNewUser";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact Book App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      {/* <main > */}
        {/* <Navbar/> */}
        {/* <InviteNewUser/> */}
        {/* <CreateNewContact/> */}
        {/* <UsersTable/> */}
        {/* <ExportViaEmail/> */}
        {/* <ContactsTable/> */}
        {/* <SignIn/> */}
        {/* <Regester/>  */}
        {/* <SetPassword/> */}
      {/* </main> */}
    </>
  );
}
