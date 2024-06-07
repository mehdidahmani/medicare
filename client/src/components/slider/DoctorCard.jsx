import React from "react";
import { linkedinImage, twitterImage, defaultProfilePicture } from '../../assets';

export default function DoctorCard({ name, specialty, profileImage }) {
  const imageSrc = profileImage ? `data:image/jpeg;base64,${profileImage}` : defaultProfilePicture;
  return (
    <div className="flex-none bg-gray-200 w-56 h-64 flex flex-col items-center justify-center p-4  rounded-md mr-2">
      <img src={imageSrc} alt="" className="w-28 h-24 mb-2 rounded-full" />
      <h3 className="text-lg font-semibold">Dr {name}</h3>
      <p className="text-m text-center mt-4">{specialty}</p>
      <div className="flex space-x-6 justify-end mt-auto">
        <img alt="" className="h-6 w-auto" src={linkedinImage} />
        <img alt="" className="h-6 w-auto" src={twitterImage} />
      </div>
    </div>
  );
}
