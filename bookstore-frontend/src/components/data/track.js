// audio files
import song from './hitha parana katha.mp3.mp3';
import song2 from "./Obata_Ma_Aadaraya_Kala_Malani_Bulathsinhala_Sarigama_lk.mp3"
import Thumbnail from './music 1.mp3.jpg';

export const tracks = [
  {
    title: 'Read Lanka ',
    src: song,
    author: 'Sri Lankan Music',
    thumbnail: Thumbnail,
  },
  {
    title: 'Test Lanka ',
    src: song2,
    author: 'Sri Lankan Music',
    thumbnail: Thumbnail,
  },
  {
    title: 'Test 2 Lanka ',
    src: song,
    author: 'Sri Lankan Music',
    thumbnail: Thumbnail,
  },
  
];

// import { useState, useEffect } from "react";
// import API_ENDPOINT from "../../apis/httpAxios";
// import { FETCH_ALL_READ_BOOK } from "../../apis/endpoints";

// const Tracks = (selectedAudioId) => {
//   const [trackAudio, setTrackAudio] = useState([]);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrackData = async () => {
//       try {
//         const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedAudioId}`);
//         if (response.status === 200) {
//           const selectedBookData = response.data.data;
//           console.log('Selected Audio Book Data:', selectedBookData);

//           const trackData = {
//             title: selectedBookData.title,
//             src: selectedBookData.bookFile_url,
//             author: selectedBookData.authorName,
//             thumbnail: selectedBookData.thumbnail_url
//           };
//           setTrackAudio([trackData]);
//           setCurrentTrack(trackData);
//           setLoading(false);
//         } else {
//           window.location.href = "/login";
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchTrackData();
//   }, [selectedAudioId]);

//   return { trackAudio, currentTrack, loading };
// };

// export default Tracks;



