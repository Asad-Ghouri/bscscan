import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useMoralis } from "react-moralis";

function Nav() {
  const { authenticate } = useMoralis();

  const { isAuthenticated, logout, user } = useMoralis();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://nftify-platform.s3.ap-southeast-1.amazonaws.com/logo/62d170f22994a0bed7213b80-1658926016888.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Team
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Projects
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Calendar
                  </a>

                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <a
                href="https://shera-market-nft.com/"
                color="var(--color_button_main_text)"
                background="var(--color_button_main_bg)"
                // type="button"
                className="dEQEDw text-white font-bold py-2 px-4 rounded mr-3 hbtn"
              >
                Home
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-[5.75rem] space-y-1 sm:px-3"
              >
                {/* <a
                  href="https://shera-market-nft.com/"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a> */}

                <a
                  href="https://shera-market-nft.com/discover"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Discover
                </a>

                <a
                  href="https://shera-market-nft.com/box-event"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Mystery boxes
                </a>

                <a
                  href="https://shera-market-nft.com/airdrop"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Airdrops
                </a>

                <a
                  href="https://shera-market-nft.com/activity"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Activity
                </a>
                <button
                  color="var(--color_button_main_text)"
                  background="var(--color_button_main_bg)"
                  type="button"
                  className="ant-btn dEQEDw theme-btn mr-3"
                >
                  {isAuthenticated ? (
                    <span onClick={logout}>LogOut</span>
                  ) : (
                    <span onClick={authenticate}>Connect Wallet</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
