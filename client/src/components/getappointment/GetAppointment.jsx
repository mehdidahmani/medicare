import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logoImage } from '../../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const GetAppointment = ({ visible, onClose ,accessToken}) => {
  const [medcins, setMedcins] = useState([]);
  const [heures, setHeures] = useState([]);

  useEffect(() => {
    // Fetch medcins
    axios.get('http://localhost:3001/medcins')
      .then(response => {
        setMedcins(response.data);
      })
      .catch(error => {
        console.error('Error fetching medcins:', error);
      });

    // Fetch heures
    axios.get('http://localhost:3001/heures')
      .then(response => {
        setHeures(response.data);
      })
      .catch(error => {
        console.error('Error fetching heures:', error);
      });

    // Fetch occupied heures
    axios.get('http://localhost:3001/rendezvous')
      .catch(error => {
        console.error('Error fetching occupied heures:', error);
      });
    
  }, []);

  const initialValues = {
    Id_Medcin: 1,
    Date: "", // Correct date format
    Id_Heure: '',
    Id_Patient:'',
    En_Urgence: false,
  };

  const validationSchema = Yup.object().shape({
    Id_Medcin: Yup.number().required(),
    Date: Yup.string().required(),
    Id_Heure: Yup.number().required(),
    Id_Patient:Yup.number(),
    En_Urgence: Yup.boolean(),
  });
  
  const [showBookingSucceed, setShowBookingSucceed] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === 'closingArea') onClose();
  };
  const onSubmit = (values) => {

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
        console.error('Form submission error:', error);
      });
  };

  return (
    <div id='closingArea' onClick={handleOnClose} className={`getemergency fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm ${visible ? 'block' : 'hidden'}`}>
      {showBookingSucceed && (
        <div>
          <div className="bg-white p-4 rounded text-center">
            <p className="text-green-600 font-semibold text-xl">Booked successfully</p>
          </div>
        </div>
      )}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="w-full max-w-md p-4 bg-white rounded-lg mx-auto mt-20">
            <img src={logoImage} alt="logo" className="w-28 h-auto mx-auto mb-8" />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-medium">Medcin :</label>
                <Field
                  as="select"
                  name="Id_Medcin"
                  className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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
                  className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="Date" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block mb-2 font-medium">Heure :</label>
                <Field as="select" name="Id_Heure" className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500">
                  <option value="">Select an heure</option>
                  {heures.map((heure) => (
                    <option key={heure.Id_Heure} value={heure.Id_Heure} >
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
      </Formik>
    </div>
  );
};

export default GetAppointment;
