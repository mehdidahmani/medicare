import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import AddUser from './user/Adduser';
import Deleteuser from './user/Deleteuser';

export default function Patients() {
  const [listAllUsers, setListAllUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const handleOnClose = () => {
    setShowAddUserModal(false);
    setShowDeleteUserModal(false);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/auth")
      .then((response) => {
        setListAllUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Nom', headerName: 'Nom', width: 150 },
    { field: 'Prenom', headerName: 'Prénom', width: 150 },
    { field: 'Date_Nai', headerName: 'Date de Naissance', width: 150 },
    { field: 'Adresse', headerName: 'Adresse', width: 150 },
    { field: 'Sexe', headerName: 'Sexe', width: 150 },
    { field: 'Num_Tel', headerName: 'Numéro de Téléphone', width: 150 },
  ];

  const rows = listAllUsers.map((user) => ({
    id: user.Id_Patient,
    Nom: user.Nom,
    Prenom: user.Prenom,
    Date_Nai: user.Date_Nai,
    Adresse: user.Adresse,
    Sexe: user.Sexe,
    Num_Tel: user.Num_Tel,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setShowAddUserModal(true)} className="bg-teal-300 text-xl font-semibold rounded-lg px-5 mx-3 hover:text-white duration-300 hover:bg-black">Ajouter patient</button>
        <button  onClick={() => setShowDeleteUserModal(true)} className="bg-red-300 text-xl font-semibold rounded-lg px-5 mx-3 hover:text-white duration-300 hover:bg-black">Supprimer patient</button>
      </div>
      <DataGrid rows={rows} columns={columns} />
      <Deleteuser onClose={handleOnClose} visible={showDeleteUserModal} />
      <AddUser onClose={handleOnClose} visible={showAddUserModal} />
    </div>
  );
}
