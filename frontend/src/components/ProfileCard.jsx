// import { FaStar, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const ProfileCard = ({ profile }) => {
//   const navigate = useNavigate();

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//         );
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
//         );
//       } else {
//         stars.push(
//           <FaStar key={i} className="w-4 h-4 text-gray-300 fill-current" />
//         );
//       }
//     }
//     return stars;
//   };

//   const handleViewPortfolio = () => {
//     navigate(`/portfolio/${profile._id}`);
//   };

//   return (
//     <div className="card card-hover bg-gradient-to-br from-yellow-50 to-white">
//       {/* Profile Image */}
//       <div className="p-6 pb-0">
//         <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
//           <img
//             src={profile.hero?.profileImage || '/default-avatar.png'}
//             alt={profile.hero?.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Profile Info */}
//       <div className="p-6 pt-4 text-center">
//         {/* Name */}
//         <h3 className="text-xl font-bold text-slate-900 mb-1">
//           {profile.hero?.name}
//         </h3>

//         {/* Age */}
//         <p className="text-sm text-slate-500 mb-2">
//           Age: {profile.aboutMe?.age || 'N/A'}
//         </p>

//         {/* Role Badge */}
//         <div className="flex justify-center mb-3">
//           <span className="bg-slate-800 text-white text-xs font-bold px-4 py-1 rounded-full">
//             {profile.hero?.title}
//           </span>
//         </div>

//         {/* Location */}
//         <div className="flex items-center justify-center gap-1 text-sm text-slate-600 mb-3">
//           <FaMapMarkerAlt className="w-3 h-3" />
//           <span>{profile.aboutMe?.location || 'Remote'}</span>
//         </div>

//         {/* Rating */}
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <div className="flex gap-1">{renderStars(4.8)}</div>
//           <span className="text-sm font-semibold text-slate-700">4.8</span>
//         </div>

//         {/* Bio */}
//         <p className="text-sm text-slate-600 mb-4 line-clamp-3">
//           {profile.aboutMe?.bio || 'No bio available'}
//         </p>

//         {/* Experience & Projects */}
//         <div className="flex justify-around mb-4 py-3 bg-yellow-50 rounded-lg">
//           <div>
//             <p className="text-xs text-slate-500 mb-1">Experience</p>
//             <p className="text-lg font-bold text-slate-900">
//               {profile.services?.length || 0}+ <span className="text-xs font-normal">years</span>
//             </p>
//           </div>
//           <div className="h-full w-px bg-slate-200"></div>
//           <div>
//             <p className="text-xs text-slate-500 mb-1">Projects</p>
//             <p className="text-lg font-bold text-slate-900">
//               {profile.portfolio?.length || 0}
//             </p>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="mb-4">
//           <div className="flex flex-wrap gap-2 justify-center">
//             {profile.skills?.slice(0, 3).map((skill, index) => (
//               <span
//                 key={index}
//                 className="text-xs bg-white border border-yellow-200 text-slate-700 px-3 py-1 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}
//             {profile.skills?.length > 3 && (
//               <span className="text-xs bg-white border border-yellow-200 text-slate-700 px-3 py-1 rounded-full">
//                 +{profile.skills.length - 3}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Contact Button */}
//         <button
//           onClick={handleViewPortfolio}
//           className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
//         >
//           <FaEnvelope className="w-4 h-4" />
//           Contact
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;





// src/components/ProfileCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaEnvelope, FaEdit, FaTrash } from 'react-icons/fa';
import { useDeletePortfolioMutation } from '../app/api/portfolioApi';

const ProfileCard = ({ profile, showActions = false }) => {
  const navigate = useNavigate();
  const [deletePortfolio, { isLoading: isDeleting }] = useDeletePortfolioMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleViewProfile = () => {
    navigate(`/portfolio/${profile._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${profile._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePortfolio(profile._id).unwrap();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
    }
  };

  const skills = profile.skills?.slice(0, 3) || [];
  const rating = 4.8; // You can make this dynamic

  return (
    <>
      <div 
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
        onClick={handleViewProfile}
      >
        {/* Action Buttons - Top Right */}
        {showActions && (
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button
              onClick={handleEdit}
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              title="Edit Portfolio"
            >
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50"
              title="Delete Portfolio"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={profile.hero?.profileImage || '/default-avatar.png'}
                alt={profile.hero?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-slate-900 text-center mb-1 truncate">
            {profile.hero?.name}
          </h3>

          {/* Age */}
          <p className="text-sm text-slate-500 text-center mb-3">Age: N/A</p>

          {/* Title Badge */}
          <div className="flex justify-center mb-3">
            <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {profile.hero?.title}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center text-slate-600 mb-3">
            <FaMapMarkerAlt className="mr-2 text-yellow-500" />
            <span className="text-sm">{profile.aboutMe?.location || 'Remote'}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < 4 ? 'text-yellow-400' : 'text-slate-300'}`} />
              ))}
            </div>
            <span className="ml-2 font-bold text-slate-900">{rating}</span>
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-600 text-center mb-4 line-clamp-3">
            {profile.aboutMe?.bio || 'No bio available'}
          </p>

          {/* Experience & Projects */}
          <div className="flex justify-between text-center mb-4">
            <div>
              <p className="text-xs text-slate-500">Experience</p>
              <p className="font-bold text-slate-900">
                {profile.experience || '3+'} <span className="text-sm font-normal">years</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Projects</p>
              <p className="font-bold text-slate-900">{profile.portfolio?.length || 3}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {profile.skills?.length > 3 && (
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium">
                +{profile.skills.length - 3}
              </span>
            )}
          </div>

          {/* Contact Button */}
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
            <FaEnvelope />
            Contact
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Portfolio?</h3>
              <p className="text-slate-600">
                Are you sure you want to delete the portfolio of <strong>{profile.hero?.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
