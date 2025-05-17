import React from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Image from "next/image";
import { useAppSelector } from "../app/config/hook";
import { SlotService } from "../services/slotService";
import { AuthService } from "@/services/authService";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";

const slotService = new SlotService("http://your-api-url.com");
const authService = new AuthService("http://your-api-url.com");



const Navbar = ({
    onOpenSidenav,
    brandText,
    secondary,
    darkmode,
    setDarkmode,
  }: {
    onOpenSidenav?: () => void;
    brandText?: string;
    secondary?: boolean | string;
    darkmode: boolean;
    setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { limit, currentPage } = useAppSelector(state => state.slot);
    const user = useAppSelector(state => state.user);

    const dispatch = useDispatch();
    const navigating = useNavigate();

    const handleLogout = () => {
        authService.logoutMUser(dispatch, navigating);
        // You might need to dispatch a logout action here if using Redux
    };

    return (
        <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
            <div className="ml-[6px]">
                <div className="h-6 w-[224px] pt-1">
                    <Link
                        className="font-normal text-sm text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                        to="/"
                    >
                        Book
                        <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                            {" "}/{" "}
                        </span>
                    </Link>
                    <Link
                        className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                        to="#"
                    >
                        {brandText}
                    </Link>
                </div>
                <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
                    <Link
                        to="#"
                        className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
                    >
                        {brandText}
                    </Link>
                </p>
            </div>

            <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
                    <p className="pl-3 pr-2 text-xl">
                        <FiSearch className="w-4 h-4 text-gray-400 dark:text-white" />
                    </p>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                        onChange={(e) => {
                            slotService.getSlots({ page: currentPage, limit: limit }, { name: e.target.value });
                        }}
                    />
                </div>
                <span
                    className="flex text-xl text-gray-600 cursor-pointer dark:text-white xl:hidden"
                    onClick={onOpenSidenav}
                >
                    <FiAlignJustify className="w-5 h-5" />
                </span>
                <div
                    className="text-gray-600 cursor-pointer"
                    onClick={() => {
                        if (darkmode) {
                            document.body.classList.remove("dark");
                            setDarkmode(false);
                        } else {
                            document.body.classList.add("dark");
                            setDarkmode(true);
                        }
                    }}
                >
                    {darkmode ? (
                        <RiSunFill className="w-4 h-4 text-gray-600 dark:text-white" />
                    ) : (
                        <RiMoonFill className="w-4 h-4 text-gray-600 dark:text-white" />
                    )}
                </div>

                {/* Shadcn Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Image
                                className="w-10 h-10 rounded-full"
                                src="/img/avatar.jpeg"
                                alt="User Avatar"
                                width={40}
                                height={40}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-56 rounded-[20px] bg-white shadow-xl dark:bg-navy-700 dark:text-white"
                    >
                        <div className="px-4 py-3">
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                                👋 Hey, {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <div className="w-full h-px bg-gray-200 dark:bg-white/20" />
                        <DropdownMenuItem
                            className="text-sm font-medium text-red-500 hover:text-red-500 focus:text-red-500 focus:bg-transparent dark:hover:text-red-500 dark:focus:text-red-500"
                            onClick={handleLogout}
                        >
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;