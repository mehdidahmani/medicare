import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { defaultProfilePicture } from '../../assets'; 
import AddDoctor from './doctor/Addoctor';
import Deletedoctor from './doctor/Deletedoctor';
import { DataGrid } from '@mui/x-data-grid';


export default function Doctors() {
  const [listOfMedcins, setListOfMedcins] = useState([]);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showDeleteDoctorModal, setShowDeleteDoctorModal] = useState(false);

  const handleOnClose = () => {
    setShowAddDoctorModal(false);
    setShowDeleteDoctorModal(false);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/medcins")
      .then((response) => {
        setListOfMedcins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medcins:', error);
      });
  }, []);

  const columns = [
    {
      field: 'ProfileImage',
      headerName: 'Photo',
      width: 120,
      renderCell: (params) => (
        <img 
          src={params.value || defaultProfilePicture}
          alt="Profile"
          className="m-0 h-10 w-auto mt-1"
        />
      ),
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Nom', headerName: 'Nom', width: 150 },
    { field: 'Prenom', headerName: 'Prénom', width: 150 },
    { field: 'Specialite_Medcin', headerName: 'Spécialité', width: 150 },
  ];

  const rows = listOfMedcins.map((medcin) => ({
    id: medcin.Id_Medcin, 
    ProfileImage: medcin.ProfileImage ? `data:image/jpeg;base64,${medcin.ProfileImage.toString('base64')}` : defaultProfilePicture,
    Nom: medcin.Nom,
    Prenom: medcin.Prenom,
    Specialite_Medcin: medcin.Specialite_Medcin,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setShowAddDoctorModal(true)} className="bg-teal-300 text-xl font-semibold rounded-lg px-5 mx-3 hover:text-white duration-300 hover:bg-black">Add a Doctor</button>
        <button onClick={() => setShowDeleteDoctorModal(true)} className="bg-red-300 text-xl font-semibold rounded-lg px-5 mx-3 hover:text-white duration-300 hover:bg-black">Delete a Doctor</button>
      </div>
      <DataGrid rows={rows} columns={columns} />
      <AddDoctor onClose={handleOnClose} visible={showAddDoctorModal} />
      <Deletedoctor onClose={handleOnClose} visible={showDeleteDoctorModal} />
    </div>
  );
}
