import { useState } from 'react';
import moment from 'moment';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateStart, setDateStart] = useState('');

  const openModal = dateFrom => {
    const formatDate = moment(dateFrom).format('HH:mm');
    setDateStart(formatDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal from button click...');
    setIsModalOpen(false);
  };

  return {
    dateStart,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
