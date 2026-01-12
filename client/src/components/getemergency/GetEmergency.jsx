import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logoImage } from '../../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const GetEmergency = ({ visible, onClose ,accessToken}) => {
  const [medcins, setMedcins] = useState([]);
  const [allHeures, setAllHeures] = useState([]);
  const [availableHeures, setAvailableHeures] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/medcins')
      .then(response => {
        setMedcins(response.data);
      })
      .catch(error => {
        console.error('Error fetching medcins:', error);
      });

    axios.get('http://localhost:3001/heures')
      .then(response => {
        setAllHeures(response.data);
        setAvailableHeures(response.data);
      })
      .catch(error => {
        console.error('Error fetching heures:', error);
      });

    axios.get('http://localhost:3001/rendezvous')
      .then(response => {
        setBookedAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const bookedHours = bookedAppointments
        .filter(apt =>
          apt.Id_Medcin === parseInt(selectedDoctor) &&
          apt.Date === selectedDate
        )
        .map(apt => apt.Id_Heure);

      const available = allHeures.filter(
        heure => !bookedHours.includes(heure.Id_Heure)
      );
      setAvailableHeures(available);
    } else {
      setAvailableHeures(allHeures);
    }
  }, [selectedDoctor, selectedDate, allHeures, bookedAppointments]);

  const initialValues = {
    Id_Medcin: 1,
    Date: "", 
    Id_Heure: '',
    Id_Patient:'',
    En_Urgence: true,
  };

  const validationSchema = Yup.object().shape({
    Id_Medcin: Yup.number().required('Please select a doctor').typeError('Please select a doctor'),
    Date: Yup.string().required('Please select a date'),
    Id_Heure: Yup.number().required('Please select a time slot').typeError('Please select a time slot'),
    Id_Patient:Yup.number(),
    En_Urgence: Yup.boolean(),
  });
  
  const [showBookingSucceed, setShowBookingSucceed] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === 'closingArea') onClose();
  };
  const onSubmit = (values) => {
    setError("");
    axios.post("http://localhost:3001/rendezvous", values, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': accessToken
      }
    })
      .then(response => {
        console.log('Form submitted successfully');
        setShowBookingSucceed(true);
        setTimeout(() => {
          setShowBookingSucceed(false);
          onClose();
        }, 2000);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while booking the emergency appointment");
        }
      });
  };

  return (
    <div id='closingArea' onClick={handleOnClose} className={`G fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm ${visible ? 'block' : 'hidden'}`}>
      {showBookingSucceed && (
        <div>
          <div className="bg-white p-4 rounded text-center">
            <p className="text-green-600 font-semibold text-xl">Booked successfully</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="w-full max-w-md p-4 bg-white rounded-lg mx-auto mt-20">
            <img src={logoImage} alt="logo" className="w-28 h-auto mx-auto mb-8" />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-medium">Medcin :</label>
                <Field
                  as="select"
                  name="Id_Medcin"
                  className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("Id_Medcin", value);
                    setSelectedDoctor(value);
                    setFieldValue("Id_Heure", "");
                  }}
                >
                  <option value="">Select a medcin</option>
                  {medcins.map((medcin) => (
                    <option key={medcin.Id_Medcin} value={medcin.Id_Medcin}>
                      {medcin.Nom}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="Id_Medcin" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block mb-2 font-medium">Date Du rendez vous:</label>
                <Field
                  type="date"
                  name="Date"
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue("Date", value);
                    setSelectedDate(value);
                    setFieldValue("Id_Heure", "");
                  }}
                />
                <ErrorMessage name="Date" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block mb-2 font-medium">Heure :</label>
                <Field
                  as="select"
                  name="Id_Heure"
                  className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="">
                    {!selectedDoctor || !selectedDate
                      ? "Please select doctor and date first"
                      : availableHeures.length === 0
                      ? "No available hours"
                      : "Select an hour"}
                  </option>
                  {availableHeures.map((heure) => (
                    <option key={heure.Id_Heure} value={heure.Id_Heure}>
                      {heure.Heure}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="Id_Heure" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <button type="submit" className="block w-full mt-4 px-4 py-2 bg-teal-400 text-white font-semibold rounded hover:bg-teal-500 focus:outline-none focus:bg-teal-500">
              Valider
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GetEmergency;
