import { useState, useRef, useEffect } from "react";
import TwoFactorModal from "../components/TwoFactorModal";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  // const handleTwoFactorModal = () =>{

  // }

  return (
    <>
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" text-white px-4 py-2 rounded-md font-medium"
        >
        Profile ▼
      </button>

      {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black/10 z-10">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => setShowModal(true)}
            >
            Enable Two-Factor Authorization
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
    
        { showModal && 
          (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <TwoFactorModal closeModal={closeModal} />
          </div>
          ) 
        }
    </>
  );
}
