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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar visible={showMyNavbar} />
            <div className="container mx-auto px-4 flex items-center mt-12">
                <div className="flex-1 mt-10">
                    <p className="font-semibold text-6xl text-black mt-10">Faire un diagnostique</p>
                    <p className="mt-8 font-semibold text-6xl">chez <span className="text-custom-color text-teal-500 font-bold">Medicare</span></p>
                    <br />
                    <p className="bg-primary font-semibold text-lg text-gray-700">Une clinique accueillante et moderne, offrant <br />des soins personnalisés de qualité pour votre bien-être et votre santé.</p>
                    {/* Tableau avec images et explications */}
                    <div className="bg-slate-200 space-x-3 shadow-xl mt-8 p-4 flex items-center w-full max-w-md mx-auto rounded-lg">
                        <div className="text-center">
                            <img src={dImage}  className="h-12 w-auto mx-auto mb-2" alt=" " />
                            <p>Un groupe +5 ans d'expérience</p>
                        </div>
                        <div className="text-center">
                            <img src={ambulanceImage} className="h-12 w-auto mx-auto mb-2" alt="" />
                            <p>Ambulance disponible 24/7</p>
                        </div>
                        <div className="text-center">
                            <img  src={hourImage} className="h-12 w-auto mx-auto mb-2" alt="" />
                            <p>Service disponible 24h/24</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-5">
                    <div className="flex flex-col space-y-4 items-center justify-center">
                        <button onClick={handleGetAppointmentClick} className="bg-teal-500 hover:bg-white hover:text-black text-black font-bold text-lg py-2 px-4 border-2 border-transparent hover:border-teal-500 rounded-lg w-60 h-12 duration-500">Get Appointment</button>
                        <button onClick={handleGetEmergencyClick} className="bg-red-500 hover:bg-red-700 text-white font-bold text-lg py-2 px-4 rounded-lg w-60 h-12 duration-500">Get Emergency</button>
                    </div>
                </div>
                <div className="flex-1">
                    <img   src={doctorImage} className="h-45 w-auto mt-12" alt="Medicare Logo" />
                </div>
            </div>
            <div className="mt-10 bg-teal-100 mx-0 h-100 p-8 flex items-center">
                <div className="mr-12 ">
                    <img  src={doctorsAvifImage} className="h-5000000 w-auto" alt="Doctors" />
                </div>
                <div>
                    <p className="font-bold text-4xl">Health Consultation for a Good Life</p>
                    <p className="font-semibold text-sm mt-4">Une consultation de santé est une rencontre entre un professionnel de la santé et un individu pour évaluer et améliorer son état de santé général. Lors de cette consultation, le professionnel de la santé prend en compte divers facteurs tels que les antécédents médicaux, le mode de vie, les habitudes alimentaires et l'activité physique de la personne. En se basant sur ces informations, des recommandations personnalisées sont fournies pour favoriser une bonne santé et prévenir les maladies. Ces recommandations peuvent inclure des conseils sur la nutrition, l'exercice physique, la gestion du stress, le sommeil et d'autres aspects liés au bien-être. Une consultation de santé efficace vise à éduquer et à responsabiliser les individus, les aidant ainsi à prendre des décisions éclairées pour maintenir leur santé à long terme.</p>
                </div>
            </div>
            <div className="flex justify-center items-center mt-11 mx-5">
                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-3xl font-semibold text-center mb-4">Our <span className="text-teal-500">values</span> to help you</p>
                    <p className="text-l font-semibold text-center mb-6">Nous disposons de plusieurs manières pour vous mettre en bonne santé</p>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <img src={pillsImage} alt="Pills" className="w-24 h-24" />
                            <p className="mt-2 text-center">Primary care</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={ambulanceImage} alt="Ambulance" className="w-24 h-24" />
                            <p className="mt-2 text-center">Ambulance 24/24h</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img  src={checklistImage} alt="Checklist" className="w-24 h-24" />
                            <p className="mt-2 text-center">Request and appointment</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={peopleImage} alt="People" className="w-24 h-24" />
                            <p className="mt-2 text-center">24/7 virtual care</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img  src={supportImage} alt="Support" className="w-24 h-24" />
                            <p className="mt-2 text-center">Contact us</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img  src={mapImage} alt="Map" className="w-24 h-24" />
                            <p className="mt-2 text-center">Map and direction</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div id='departements'>
                    <p className="text-3xl font-semibold text-center mb-4 mt-20">Nos departements</p>
                    <p className="text-l font-medium text-center mb-6"> Notre cabinet médical offre une gamme complète de spécialités médicales pour répondre à tous vos besoins de santé. <br />
                        Nos spécialités comprennent la médecine générale, la pédiatrie et la cardiologie et bientot d'autres encore. <br />
                        Chaque spécialité est gérée par des professionnels de la santé hautement qualifiés et expérimentés, <br />
                        garantissant des soins de qualité et une approche holistique de votre bien-être.</p>
                </div>
            </div>
            <div className="flex justify-between px-4 mx-10">
                <div className="flex-none bg-gray-200 w-75 min-h-80 flex flex-col items-center justify-center p-4 rounded mr-4">
                    <img alt="" src={medcineGenerale} className="w-auto h-24 mb-2" />
                    <h3 className="text-lg font-semibold">Medecine generale</h3>
                    <p className="text-sm text-center mt-4">Le médecin généraliste est votre<br /> premier point de contact pour tous vos <br /> besoins de santé, offrant <br />des soins pour vous aider à maintenir <br /> une bonne santé globale.</p>
                    <button className="bg-teal-400 rounded-lg p-2 mt-6 mx-4 duration-500 hover:bg-white border-2 border-transparent hover:border-teal-500">Prendre rendez-vous</button>
                </div>
                <div className="flex-none bg-gray-200 w-75 min-h-80 flex flex-col items-center justify-center p-4 rounded mr-4">
                    <img  alt="" src={cardioImage} className="w-auto h-24 mb-2" />
                    <h3 className="text-lg font-semibold">Cardiologue</h3>
                    <p className="text-sm text-center mt-4">Le cardiologue est un expert dans le diagnostic <br />et le traitement des maladies cardiaques, <br />offrant des soins spécialisés pour protéger <br />
                        la santé de votre cœur et de votre <br /> système cardiovasculaire.</p>
                    <button className="bg-teal-400 rounded-lg p-2 mt-6 mx-4 duration-500 hover:bg-white border-2 border-transparent hover:border-teal-500">Prendre rendez-vous</button>
                </div>
                <div className="flex-none bg-gray-200 w-75 min-h-80 flex flex-col items-center justify-center p-4 rounded">
                    <img alt="" src={pediatrie}  className="w-auto h-24 mb-2" />
                    <h3 className="text-lg font-semibold">Pediatrie</h3>
                    <p className="text-sm text-center mt-4">Le pédiatre est spécialisé dans les soins de santé <br />des nourrissons, des  enfants et des adolescents,<br /> offrant une expertise dédiée pour assurer le <br />éveloppement sain et le bien-être de vos enfants.</p>
                    <button className="bg-teal-400 rounded-lg p-2 mt-6 mx-4 duration-500 hover:bg-white border-2 border-transparent hover:border-teal-500">Prendre rendez-vous</button>
                </div>
            </div>
            <div id='doctors'>
                <p className="text-3xl font-semibold text-center mb-4 mt-20">Let’s meet our <span className="text-teal-500 ">specialits</span></p>
                <p className="text-l font-medium text-center mb-6"> Nos spécialités comprennent la médecine générale, la pédiatrie et la cardiologie et bientot d'autres encore. </p>
            </div>
            <Slider medcins={listOfMedcins} />
            <div className="flex justify-between px-4 mx-10">
              
            </div>
            <footer id='contact' className="bg-black mt-36 h-auto">
                <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between py-8">
                    {/* Informations */}
                    <div className="text-white">
                        {/* Titre */}
                        <h4 className="font-semibold mb-2">Informations</h4>
                        {/* Adresse */}
                        <p className="mb-2">123 Rue de l'Exemple</p>
                        {/* Numéro de téléphone */}
                        <p className="mb-2">Téléphone : +1234567890</p>
                        {/* Email */}
                        <p className="mb-2">Email : example@example.com</p>
                        {/* Site Web */}
                        <p className="mb-2">Site : <a href="https://www.example.com" className="text-blue-500">www.example.com</a></p>
                    </div>
                    {/* Logo */}
                    <div className="flex items-center mb-4 lg:mb-0">
                        <img  src={logoImage} alt="Logo" className="h-8 w-auto" />
                    </div>
                    {/* Formulaire d'avis */}
                    <div className="hidden lg:block">
                        <h4 className="text-white font-semibold mb-4">Laissez un avis</h4>
                        <form>
                            <input type="text" placeholder="Nom" className="block mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                            <input type="email" placeholder="Email" className="block mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
                            <textarea placeholder="Votre avis" className="block mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Envoyer</button>
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
