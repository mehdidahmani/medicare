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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center p-4 py-12">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
          <div className="flex justify-center mb-6">
            <img src={logoImage} alt="logo" className="w-32 h-auto drop-shadow-lg" />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
          <p className="text-center text-gray-600 mb-8">Join Medicare today</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
              <Field
                type="text"
                name="Nom"
                placeholder="Your last name"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="Nom" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
              <Field
                type="text"
                name="Prenom"
                placeholder="Your first name"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="Prenom" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date de Naissance</label>
              <Field
                type="date"
                name="Date_Nai"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="Date_Nai" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
              <Field
                type="text"
                name="Adresse"
                placeholder="Your address"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="Adresse" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sexe</label>
              <div className="flex items-center space-x-6 py-3">
                <label className="flex items-center cursor-pointer">
                  <Field type="radio" name="Sexe" value="M" className="w-4 h-4 text-teal-600 focus:ring-teal-500" />
                  <span className="ml-2 text-gray-700 font-medium">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <Field type="radio" name="Sexe" value="F" className="w-4 h-4 text-teal-600 focus:ring-teal-500" />
                  <span className="ml-2 text-gray-700 font-medium">Female</span>
                </label>
              </div>
              <ErrorMessage name="Sexe" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de Téléphone</label>
              <Field
                type="text"
                name="Num_Tel"
                placeholder="Your phone number"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="Num_Tel" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <Field
                type="password"
                name="password"
                placeholder="Create a password"
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full mt-8 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Create Account
          </button>

          {showSignedUpMessage && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg animate-pulse">
              <p className="font-semibold text-center">Signed up successfully! Redirecting...</p>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
