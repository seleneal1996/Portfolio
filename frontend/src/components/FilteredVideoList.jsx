import React from 'react';
import '../FilteredVideoList.css';

const FilteredVideoList = ({ videos }) => {
  // Ordenar los videos por nombre en orden ascendente
  const sortedVideos = [...videos].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="filtered-video-list">
      <h2 style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} variant="h5" gutterBottom >Resultados de la búsqueda</h2>
      <ul className="video-list">
        {sortedVideos.map(video => (
          <li key={`${video.name}-${video.etiqueta}`} className="video-item">
            <div className="video-details">
              <h3>{video.name}</h3>
              <p>Etiqueta: {video.etiqueta}</p>
              <p>Nombre: {video.name}</p>
            </div>

            <div className="video-media">
              <video width="320" height="240" controls>
                <source src={`https://${video.url_video}`} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>

              <img src={`https://${video.url_gif}`} alt="GIF" />

              <img src={`https://${video.url_image}`} alt="Thumbnail" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredVideoList;