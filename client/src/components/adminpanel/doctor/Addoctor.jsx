import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { logoImage } from '../../../assets';

const AddDoctor = ({ visible, onClose }) => {
    const initialValues = {
        Nom: "",
        Prenom: "",
        Specialite_Medcin: "",
    }

    const validationSchema = Yup.object().shape({
        Nom: Yup.string().required("Le nom est requis").max(30),
        Prenom: Yup.string().required("Le prénom est requis").max(30),
        Specialite_Medcin: Yup.string().required("La spécialité est requise").max(30),
    });

    const [showValidatedDoctorMessage, setShowValidatedDoctorMessage] = useState(false);
    const handleOnClose = (e) => {
        if (e.target.id === "closingArea") onClose();
    }

    if (!visible) return null;
    const onSubmit = (values, formikBag) => {
        axios.post("http://localhost:3001/medcins", values)
            .then(response => {
                setShowValidatedDoctorMessage(true);
                console.log('Form submitted successfully');
                formikBag.resetForm();
                setTimeout(() => {
                    onClose();
                    setShowValidatedDoctorMessage(false);
                }, 2000);

            })
            .catch(error => {
                console.error('Form submission error:', error);
            });
    };

    return (
        <div id='closingArea' onClick={handleOnClose} className="getemergency fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm ">
            {showValidatedDoctorMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-green-600 font-semibold text-xl">doctor is validated</p>
                    </div>
                </div>
            )}

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="w-auto h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1.5 border border-black rounded-md px-10 flex flex-col items-center bg-white justify-center ">
                    <img src={logoImage} alt="logo" className="w-28 h-auto mt-4 mx-auto" />
                    <div className="mt-10">
                        <label className="font-medium mb-2">Nom:</label>
                        <Field
                            autoComplete="off"
                            name="Nom"
                            placeholder="Nom"
                            className="block w-44 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Nom" component="div" className="text-red text-xs" />

                        <label className="font-medium mb-2">Prénom:</label>
                        <Field
                            autoComplete="off"
                            name="Prenom"
                            placeholder="Prénom"
                            className="block w-44 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Prenom" component="div" className="text-red text-xs" />

                        <label className="font-medium mb-2">Specialite:</label>
                        <Field
                            autoComplete="off"
                            name="Specialite_Medcin"
                            placeholder="Spécialité"
                            className="block w-32 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Specialite_Medcin" component="div" className="text-red text-xs" />

                        <button type="submit" className="bg-teal-400 px-3 border border-black hover:bg-red-700 hover:text-white rounded-lg mb-4 mt-4 ml-12">Valider</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddDoctor;
