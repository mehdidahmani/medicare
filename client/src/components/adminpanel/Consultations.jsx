import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Consulter from './consultation/Consulter';

export default function Consultations() {
  const [listAllConsultations, setAllConsultations] = useState([]);
  const [heureValues, setHeureValues] = useState({});
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const handleOnClose = () => {
    setShowConsultationModal(false);
  }

  useEffect(() => {

    const fetchConsultations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Consultations");
        const ConsultationsWithIds = response.data.map((Consultations) => ({
          ...Consultations,
          id: `${Consultations.Id_Medcin}-${Consultations.Id_Heure}-${Consultations.Date}`,
        }));

        setAllConsultations(ConsultationsWithIds);
      } catch (error) {
        console.error('Error fetching Consultations:', error);
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
        console.error('Error fetching heure values:', error);
      }
    };

    fetchConsultations();
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
      field: 'Id_Medcin',
      headerName: 'Id_Medcin',
      width: 150,
    },
    {
      field: 'Details',
      headerName: 'Details',
      width: 150,
    },

  ];

  // Mapping Consultations data to rows with Nom_Medcin value retrieved from medcinNames
  const rows = listAllConsultations.map((Consultations) => ({
    id: Consultations.id,
    Id_Patient: Consultations.Id_Patient,
    Id_Medcin: Consultations.Id_Medcin,
    Heure: heureValues[Consultations.Id_Heure],
    Date: Consultations.Date,
    Details : Consultations.Details
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
      <Consulter onClose={handleOnClose} visible={showConsultationModal} />
    </div>
  );
}
