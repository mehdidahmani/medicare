import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { logoImage } from '../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Registration = () => {

  const initialValues = {
    Nom: '',
    Prenom: '',
    Date_Nai: '',
    Adresse: '',
    Sexe: '',
    Num_Tel: '',
    password: ''
  };


  const validationSchema = Yup.object().shape({
    Nom: Yup.string().max(30),
    Prenom: Yup.string().max(30),
    Date_Nai: Yup.date().required('Date de naissance obligatoire'),
    Adresse: Yup.string(),
    Sexe: Yup.string().required('Sexe obligatoire'),
    Num_Tel: Yup.string().max(14).required('Le numéro de téléphone est obligatoire'),
    password: Yup.string().required('Le mot de passe est obligatoire')
  });
  
  const Navigate=useNavigate();

  const onSubmit = (values, { resetForm }) => {
    axios.post("http://localhost:3001/auth", values)
      .then(response => {
        console.log('Form submitted successfully');
        setShowSignedUpMessage(true);
        resetForm();
        setTimeout(() => {
          setShowSignedUpMessage(false);
          Navigate("/login");
        }, 2000);
      })
      .catch(error => {
        console.error('Form submission error:', error);
      });
  };
  const [showSignedUpMessage, setShowSignedUpMessage] = useState(false);
  return (
    <div className="flex justify-center">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="w-full max-w-md p-4 bg-white rounded-lg">
          <img src={logoImage} alt="logo" className="w-28 h-auto mt-4 mx-auto" />
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div>
              <label className="block mb-2 font-medium">Nom:</label>
              <Field
                type="text"
                name="Nom"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="Nom" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Prénom:</label>
              <Field
                type="text"
                name="Prenom"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="Prenom" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Date de Naissance:</label>
              <Field
                type="date"
                name="Date_Nai"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="Date_Nai" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Adresse:</label>
              <Field
                type="text"
                name="Adresse"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="Adresse" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Sexe:</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <Field type="radio" name="Sexe" value="M" className="mr-2" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="Sexe" value="F" className="mr-2" />
                  Female
                </label>
              </div>
              <ErrorMessage name="Sexe" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Numéro de Téléphone:</label>
              <Field
                type="text"
                name="Num_Tel"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="Num_Tel" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label className="block mb-2 font-medium">Mot de passe:</label>
              <Field
                type="password"
                name="password"
                className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          </div>
          <button type="submit" className="block w-full mt-4 px-4 py-2 bg-teal-400 text-white font-semibold rounded hover:bg-teal-500 focus:outline-none focus:bg-teal-500">
            Valider
          </button>
          {showSignedUpMessage && (
            <div >
              <div className="bg-white p-4 rounded text-center">
                <p className="text-green-600 font-semibold text-xl">Signed up successfully</p>
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
