import React from "react";
import { linkedinImage, twitterImage, defaultProfilePicture } from '../../assets';

export default function DoctorCard({ name, specialty, profileImage }) {
  const imageSrc = profileImage ? `data:image/jpeg;base64,${profileImage}` : defaultProfilePicture;
  return (
    <div className="flex-none bg-white w-64 h-80 flex flex-col items-center p-6 rounded-2xl mr-4 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className="relative mb-4">
        <img
          src={imageSrc}
          alt=""
          className="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-md"
        />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Dr {name}</h3>
      <p className="text-sm text-teal-600 font-semibold mb-4 text-center">{specialty}</p>
      <div className="flex space-x-4 mt-auto">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors duration-300 cursor-pointer">
          <img alt="" className="h-5 w-auto" src={linkedinImage} />
        </div>
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors duration-300 cursor-pointer">
          <img alt="" className="h-5 w-auto" src={twitterImage} />
        </div>
      </div>
    </div>
  );
}
