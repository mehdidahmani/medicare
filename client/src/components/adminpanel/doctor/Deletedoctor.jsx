import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { logoImage } from '../../../assets';

const Deletedoctor = ({ visible, onClose }) => {
    const initialValues = {
        Id_Medcin: "", // Initial value set to 0
    }

    const validationSchema = Yup.object().shape({
        Id_Medcin: Yup.number().required("Le ID est requis"), // ID should be a number and is required
    });

    const [showDeletedDoctorMessage, setShowDeletedDoctorMessage] = useState(false);
    const handleOnClose = (e) => {
        if (e.target.id === "closingArea") onClose();
    }

    const onSubmit = (values) => { // values is an object containing form values
        axios.delete(`http://localhost:3001/medcins/${values.Id_Medcin}`) // Access ID via values object
            .then(response => {
                setShowDeletedDoctorMessage(true); // Set state to display deletion message
                console.log('Doctor deleted successfully');
                setTimeout(() => {
                    onClose(); // Close the modal or reset state
                    setShowDeletedDoctorMessage(false); // Reset deletion message state
                }, 2000);
            })
            .catch(error => {
                console.error('Error deleting doctor:', error);
            });
    };

    if (!visible) return null;

    return (
        <div id='closingArea' onClick={handleOnClose} className="getemergency fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm ">
            {showDeletedDoctorMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-red-600 font-semibold text-xl">doctor is deleted</p>
                    </div>
                </div>
            )}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="w-auto h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1.5 border border-black rounded-md px-10 flex flex-col items-center bg-white justify-center ">
                    <img src={logoImage} alt="logo" className="w-28 h-auto mt-4 mx-auto" />
                    <div className="mt-10">
                        <label className="font-medium mb-2">ID:</label>
                        <Field
                            autoComplete="off"
                            type="number" // Set input type to number
                            name="Id_Medcin"
                            placeholder="Id_Medcin"
                            className="block w-44 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Id_Medcin" component="div" className="text-red text-xs" />
                        <button type="submit" className="bg-teal-400 px-3 border border-black hover:bg-red-700 hover:text-white rounded-lg mb-4 mt-4 ml-12">Valider</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Deletedoctor;