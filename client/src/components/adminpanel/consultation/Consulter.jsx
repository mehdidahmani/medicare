import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { logoImage } from '../../../assets';

const Consulter = ({ visible, onClose }) => {
    const initialValues = {
        Id_RendezVous: "",
        Details: ""
    }

    const validationSchema = Yup.object().shape({
        Id_RendezVous: Yup.string().required("Le ID est requis"),
        Details: Yup.string()
    });

    const [showConsultationMessage, setShowConsultationMessage] = useState(false);
    const handleOnClose = (e) => {
        if (e.target.id === "closingArea") onClose();
    }

    const onSubmit = async (values) => {
        try {
            const RND = await axios.get(`http://localhost:3001/rendezvous/${values.Id_RendezVous}`);
            const consultationData = {
                ...RND.data,
                Details: values.Details
            };
            console.log(consultationData);
            await axios.post("http://localhost:3001/consultations", consultationData);
            console.log('patient consulter avec succes');
            axios.delete(`http://localhost:3001/rendezvous/${values.Id_RendezVous}`);
            setTimeout(() => {
                onClose();
                setShowConsultationMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Erreur consultation :', error);
        }
    };

    if (!visible) return null;

    return (
        <div id='closingArea' onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm">
            {showConsultationMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-red-600 font-semibold text-xl">patient consulter</p>
                    </div>
                </div>
            )}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="w-auto h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1.5 border border-black rounded-md px-10 flex flex-col items-center bg-white justify-center">
                    <img src={logoImage} alt="logo" className="w-28 h-auto mt-4 mx-auto" />
                    <div className="mt-10">
                        <label className="font-medium mb-2">ID:</label>
                        <Field
                            autoComplete="off"
                            type="text"
                            name="Id_RendezVous"
                            placeholder="Id_RendezVous"
                            className="block w-44 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Id_RendezVous" component="div" className="text-red text-xs" />

                        <label className="font-medium mb-2">Details:</label>
                        <Field
                            autoComplete="off"
                            type="text"
                            name="Details"
                            placeholder="Details"
                            className="block w-44 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-1"
                        />
                        <ErrorMessage name="Details" component="div" className="text-red text-xs" />
                        <button type="submit" className="bg-teal-400 px-3 border border-black hover:bg-red-700 hover:text-white rounded-lg mb-4 mt-4 ml-12">Valider</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Consulter;
