import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
import GetEmergency from '../components/getemergency/GetEmergency';
import GetAppointment from '../components/getappointment/GetAppointment';
import Slider from '../components/slider/Slider';
import {useNavigate } from 'react-router-dom';
import {
    dImage,
    hourImage,
    doctorImage,
    doctorsAvifImage,
    pillsImage,
    ambulanceImage,
    checklistImage,
    peopleImage,
    supportImage,
    mapImage,
    logoImage,
    medcineGenerale,
  cardioImage,
  pediatrie
} from '../assets';

const Home = () => {
    const [listOfMedcins, setListOfMedcins] = useState([]);
    const [showMyGetEmergency, setShowMyGetEmergency] = useState(false);
    const [showMyGetAppointment, setShowMyGetAppointment] = useState(false);
    const [showMyNavbar, setShowMyNavbar] = useState(true);
    const [accessToken, setAccessToken]= useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/medcins").then((response) => {
            setListOfMedcins(response.data);
        });
    }, []);

    const handleOnClose = () => {
        setShowMyGetEmergency(false);
        setShowMyGetAppointment(false)
        setShowMyNavbar(true);
    }

    const handleGetEmergencyClick = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        setAccessToken(accessToken);
        if (accessToken) {
            setShowMyGetEmergency(true);
            setShowMyNavbar(false);
        } else {
            Navigate("/login");
        }
    }

    const handleGetAppointmentClick = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        setAccessToken(accessToken);
        if (accessToken) {
            setShowMyGetAppointment(true);
            setShowMyNavbar(false);
        } else {
            Navigate("/login");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
            <Navbar visible={showMyNavbar} />
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between pt-32 pb-12">
                <div className="flex-1 mt-10 max-w-2xl">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Faire un diagnostique
                    </h1>
                    <h2 className="mt-6 text-5xl lg:text-6xl font-bold text-gray-900">
                        chez <span className="text-teal-600 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Medicare</span>
                    </h2>
                    <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-xl">
                        Une clinique accueillante et moderne, offrant des soins personnalisés de qualité pour votre bien-être et votre santé.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm space-x-3 shadow-2xl mt-12 p-6 flex items-center justify-around rounded-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                        <div className="text-center group">
                            <div className="bg-teal-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3 group-hover:bg-teal-200 transition-colors duration-300">
                                <img src={dImage} className="h-8 w-auto" alt=" " />
                            </div>
                            <p className="text-sm font-medium text-gray-700">+5 ans d'expérience</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-red-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors duration-300">
                                <img src={ambulanceImage} className="h-8 w-auto" alt="" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Ambulance 24/7</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-blue-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors duration-300">
                                <img src={hourImage} className="h-8 w-auto" alt="" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Service 24h/24</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-10 lg:mt-5 flex flex-col items-center space-y-6">
                    <button
                        onClick={handleGetAppointmentClick}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-lg py-4 px-8 rounded-xl w-72 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Get Appointment
                    </button>
                    <button
                        onClick={handleGetEmergencyClick}
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold text-lg py-4 px-8 rounded-xl w-72 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Get Emergency
                    </button>
                </div>
                <div className="flex-1 hidden lg:block">
                    <img src={doctorImage} className="h-auto w-full max-w-md ml-auto drop-shadow-2xl" alt="Medicare Logo" />
                </div>
            </div>
            <div className="mt-20 bg-white/70 backdrop-blur-sm mx-8 rounded-3xl shadow-xl p-12 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                    <img src={doctorsAvifImage} className="w-full h-auto rounded-2xl shadow-2xl" alt="Doctors" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-6">Health Consultation for a Good Life</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">Une consultation de santé est une rencontre entre un professionnel de la santé et un individu pour évaluer et améliorer son état de santé général. Lors de cette consultation, le professionnel de la santé prend en compte divers facteurs tels que les antécédents médicaux, le mode de vie, les habitudes alimentaires et l'activité physique de la personne. En se basant sur ces informations, des recommandations personnalisées sont fournies pour favoriser une bonne santé et prévenir les maladies.</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 py-20">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-12 rounded-3xl shadow-xl">
                    <h3 className="text-4xl font-bold text-center mb-4 text-gray-900">Our <span className="text-teal-600">values</span> to help you</h3>
                    <p className="text-lg font-medium text-center mb-12 text-gray-600">Nous disposons de plusieurs manières pour vous mettre en bonne santé</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-teal-100 rounded-full p-4 mb-4">
                                <img src={pillsImage} alt="Pills" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">Primary care</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-red-100 rounded-full p-4 mb-4">
                                <img src={ambulanceImage} alt="Ambulance" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">Ambulance 24/24h</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-blue-100 rounded-full p-4 mb-4">
                                <img src={checklistImage} alt="Checklist" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">Request and appointment</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-cyan-100 rounded-full p-4 mb-4">
                                <img src={peopleImage} alt="People" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">24/7 virtual care</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-green-100 rounded-full p-4 mb-4">
                                <img src={supportImage} alt="Support" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">Contact us</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="bg-orange-100 rounded-full p-4 mb-4">
                                <img src={mapImage} alt="Map" className="w-16 h-16" />
                            </div>
                            <p className="mt-2 text-center font-semibold text-gray-800">Map and direction</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-8 py-20">
                <div id='departements'>
                    <h3 className="text-4xl font-bold text-center mb-6 text-gray-900">Nos départements</h3>
                    <p className="text-lg font-medium text-center mb-12 text-gray-600 max-w-4xl mx-auto">
                        Notre cabinet médical offre une gamme complète de spécialités médicales pour répondre à tous vos besoins de santé.
                        Nos spécialités comprennent la médecine générale, la pédiatrie et la cardiologie et bientôt d'autres encore.
                        Chaque spécialité est gérée par des professionnels de la santé hautement qualifiés et expérimentés,
                        garantissant des soins de qualité et une approche holistique de votre bien-être.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <img alt="" src={medcineGenerale} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Médecine générale</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Le médecin généraliste est votre premier point de contact pour tous vos besoins de santé, offrant des soins pour vous aider à maintenir une bonne santé globale.</p>
                            <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                                Prendre rendez-vous
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <img alt="" src={cardioImage} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Cardiologie</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Le cardiologue est un expert dans le diagnostic et le traitement des maladies cardiaques, offrant des soins spécialisés pour protéger la santé de votre cœur et de votre système cardiovasculaire.</p>
                            <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                                Prendre rendez-vous
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <img alt="" src={pediatrie} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Pédiatrie</h4>
                            <p className="text-gray-600 leading-relaxed mb-6">Le pédiatre est spécialisé dans les soins de santé des nourrissons, des enfants et des adolescents, offrant une expertise dédiée pour assurer le développement sain et le bien-être de vos enfants.</p>
                            <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                                Prendre rendez-vous
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 py-20" id='doctors'>
                <div className="max-w-7xl mx-auto px-8">
                    <h3 className="text-4xl font-bold text-center mb-4 text-gray-900">Let's meet our <span className="text-teal-600">specialists</span></h3>
                    <p className="text-lg font-medium text-center mb-12 text-gray-600">Nos spécialités comprennent la médecine générale, la pédiatrie et la cardiologie et bientôt d'autres encore.</p>
                </div>
                <Slider medcins={listOfMedcins} />
            </div>
            <footer id='contact' className="bg-gradient-to-br from-gray-900 to-gray-800 mt-20">
                <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row justify-between gap-12">
                    <div className="text-white flex-1">
                        <h4 className="text-2xl font-bold mb-6 text-teal-400">Informations</h4>
                        <div className="space-y-3">
                            <p className="flex items-center gap-2">
                                <span className="text-teal-400">📍</span> 123 Rue de l'Exemple
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-teal-400">📞</span> +1234567890
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-teal-400">✉️</span> example@example.com
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-teal-400">🌐</span>
                                <a href="https://www.example.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">www.example.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                        <img src={logoImage} alt="Logo" className="h-16 w-auto drop-shadow-2xl" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white text-2xl font-bold mb-6 text-teal-400">Laissez un avis</h4>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nom"
                                className="block w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="block w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                            <textarea
                                placeholder="Votre avis"
                                rows="4"
                                className="block w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </footer>
            <GetEmergency onClose={handleOnClose} visible={showMyGetEmergency} accessToken={accessToken}/>
            <GetAppointment onClose={handleOnClose} visible={showMyGetAppointment} accessToken={accessToken}/>
        </div>
    );
};

export default Home;
