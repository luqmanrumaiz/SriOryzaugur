import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import Select from "react-select";

import Logo from "../../assets/images/logo.png"
import React, {useContext, useEffect, useState} from "react";
import {LANGUAGE_OPTIONS} from "../../values/constants";
import LanguageSelector from "./languageSelector";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [navigation, setNavigation] = useState([
        { name: t("home_page"), href: "/", current: true },
        { name: t("forecast_page"), href: "forecast", current: false },
        { name: t("guide_page"), href: "guide", current: false },
    ]);

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleHrefChange = (newHref) => {
            let updatedNavigation = navigation
            updatedNavigation.forEach(navItem => {
                if(newHref === "")
                    newHref = "/"

                navItem.current = navItem.href === newHref;
            });

            setNavigation(updatedNavigation);
        };

        const handleLocationChange = () => {
            const newHref = window.location.pathname.substr(1);
            handleHrefChange(newHref);
        };
        window.addEventListener("popstate", handleLocationChange);

        handleHrefChange(window.location.pathname.substr(1));

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
        }
    }, []);

    useEffect(() => {

        let updatedNavigation = navigation

        updatedNavigation[0].name = t("home_page")
        updatedNavigation[1].name = t("forecast_page")
        updatedNavigation[2].name = t("guide_page")

        setNavigation(updatedNavigation);

    }, [t]);

    useEffect(() => {
        // Update navigation when the language changes
        let updatedNavigation = navigation.map((item) => ({
            ...item,
            name: t(item.name),
        }));
        setNavigation(updatedNavigation);

        }, [i18n.language]);

    return (
        <Disclosure as="nav" className="bg-white-800">
            {({open}) => (
                <>
                    <div className="mx-auto shadow-md px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button
                                    onClick={() => setShowOverlay(!showOverlay)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            {showOverlay && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 bg-green-700 ">
                                    <div className="max-w-sm mx-auto bg-white p-8 rounded-lg animate-fade-in">
                                        <ul className="space-y-4">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className="block py-2 px-4 text-gray-800 font-bold rounded-sm hover:text-white hover:bg-yellow-700 transition duration-300 ease-in-out"
                                                        onClick={() => setShowOverlay(false)}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-12 w-auto lg:hidden"
                                        src={Logo}
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-12 w-auto lg:block"
                                        src={Logo}
                                        alt="Your Company"
                                    />
                                </div>
                            </div>
                            <LanguageSelector />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-yellow-600 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}