import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateStart, setDateStart] = useState("");

  const openModal = (dateFrom) => {
    setDateStart(dateFrom);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal called");
    setIsModalOpen(false);
    setDateStart("");
  };

  return {
    dateStart,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
