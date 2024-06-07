import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Consulter from './consultation/Consulter';

export default function Rendezvous() {
  const [listAllRendezvous, setAllRendezvous] = useState([]);
  const [medcinNames, setMedcinNames] = useState({});
  const [heureValues, setHeureValues] = useState({});
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const handleOnClose = () => {
    setShowConsultationModal(false);
  }

  useEffect(() => {

    const fetchRendezvous = async () => {
      try {
        const response = await axios.get("http://localhost:3001/rendezvous");
        const rendezvousWithIds = response.data.map((rendezvous) => ({
          ...rendezvous,
          id: `${rendezvous.Id_Medcin}-${rendezvous.Id_Heure}-${rendezvous.Date}`,
        }));

        setAllRendezvous(rendezvousWithIds);
      } catch (error) {
        console.error('Error fetching rendezvous:', error);
      }
    };

    const fetchAllMedcinNames = async () => {
      try {
        const response = await axios.get("http://localhost:3001/medcins");
        const valuesMap = response.data.reduce((acc, medcin) => {
          acc[medcin.Id_Medcin] = medcin.Nom;
          return acc;
        }, {});

        setMedcinNames(valuesMap);
      } catch (error) {
        console.error('Error fetching medcin names:', error);
      }
    };

    const fetchAllheureValues = async () => {
      try {
        const response = await axios.get("http://localhost:3001/heures");
        const valuesMap = response.data.reduce((acc, heure) => {
          acc[heure.Id_Heure] = heure.Heure;
          return acc;
        }, {});

        setHeureValues(valuesMap);
        console.log(valuesMap)
      } catch (error) {
        console.error('Error fetching heure names:', error);
      }
    };

    fetchRendezvous();
    fetchAllMedcinNames();
    fetchAllheureValues();
  }, []);


  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },

    {
      field: 'Id_Patient',
      headerName: 'ID Patient',
      width: 150,
    },

    {
      field: 'Nom_Medcin',
      headerName: 'Nom Medcin',
      width: 150,
    },
    {
      field: 'Date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'Heure',
      headerName: 'Heure',
      width: 150,
    },
    {
      field: 'En_Urgence',
      headerName: 'En Urgence',
      width: 150,
    },

  ];

  // Mapping rendezvous data to rows with Nom_Medcin value retrieved from medcinNames
  const rows = listAllRendezvous.map((rendezvous) => ({
    id: rendezvous.id,
    Id_Patient: rendezvous.Id_Patient,
    En_Urgence: rendezvous.En_Urgence,
    Nom_Medcin: medcinNames[rendezvous.Id_Medcin] || '', // Get medcin name from medcinNames
    Heure: heureValues[rendezvous.Id_Heure],
    Date: rendezvous.Date
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setShowConsultationModal(true)} className="bg-teal-300 text-xl font-semibold rounded-lg px-5 mx-3 hover:text-white duration-300 hover:bg-black">Consulter</button>
      </div>
      <DataGrid rows={rows} columns={columns} />
      <Consulter onClose={handleOnClose} visible={showConsultationModal} />
    </div>
  );
}
