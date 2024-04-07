import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import * as THREE from 'three';
import ApiComponent from './components/ApiComponent';
import FilteredVideoList from './components/FilteredVideoList';
import './FilteredVideoList.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search'
import ThreeScene from './components/ThreeScene';;

//import './App.css';

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';



const AppLogo = () => (
  <img
    src="./Logogif.gif"  // Reemplaza esto con la ruta de tu imagen PNG
    //alt="Logo de Video Search Cloud"
    style={{ height: '80px', marginRight: '10px' }}  // Ajusta el estilo según tus necesidades
  />
);

const App = () => {
  const [contentType, setContentType] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  const handleContentTypeChange = (newType) => {
    setContentType(newType);
  };
  
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);

    const formattedSearchQuery =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();

    fetch(`http://127.0.0.1:8000/videos/filter/${formattedSearchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredVideos(data);
        setRecentSearches((prevSearches) => [
          { query: formattedSearchQuery, videos: data },
          ...prevSearches.slice(0, 4),
        ]);
      })
      .catch((error) => console.error('Error fetching filtered videos:', error))
      .finally(() => {
        setIsLoading(false);
        setSearchQuery('');
      });
  };

  const handleRecentSearchClick = (recentSearch) => {
    setSearchQuery(recentSearch.query);
    setFilteredVideos(recentSearch.videos);
    setSelectedSuggestion(recentSearch.query);
  };

  const handleSuggestionClick = () => {
    setSearchQuery(selectedSuggestion);
    handleSearch();
    setSelectedSuggestion('');
  };

  return (

    
    <div >
      

      
      <AppBar position="sticky">

      <Toolbar sx={{ backgroundColor: '#123b43' }}>
        <AppLogo />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VIDEO SEARCH CLOUD
        </Typography>
      </Toolbar>


      </AppBar>



      <Container sx={{ marginTop: 2, marginLeft: 0 }}>
        
        <Grid container spacing={10}>



          <Grid item xs={12} md={4}>
          <Paper elevation={20} sx={{ padding: 2, marginRight: -10, marginLeft: '0px' }}>
              <Typography variant="h5">Recientes</Typography>
              <ul>
                {recentSearches.map((recentSearch, index) => (
                  <li
                    key={index}
                    onClick={() => handleRecentSearchClick(recentSearch)}
                  >
                    {recentSearch.query}
                    {recentSearch.videos.length > 0 && (
                      <div className="thumbnail-container">
                        {recentSearch.videos.map((video, vidIndex) => (
                          <img
                            key={vidIndex}
                            src={`https://${video.url_image}`}
                            alt={`Thumbnail ${video.name}`}
                          />
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              </Paper>
          </Grid>


        
            
 

          

          <Grid item xs={12} md={8}>
          
            <Container >
            
            
              <ApiComponent />
            



              <Box className="search-container">
                <TextField
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedSuggestion('');
                  }}
                  label="Buscar videos por etiqueta..."
                  variant="outlined"
                  fullWidth
                  size="small"
                  

                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleSearch}
                        disabled={isLoading}
                        variant="contained"
                        className="search-button"
                      >
                        {isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <SearchIcon />
                        )}
                      </Button>
                    ),
                  }}
                />



                {selectedSuggestion && (
                  <Button onClick={handleSuggestionClick} variant="outlined" style={{ marginLeft: '10px' }}>
                    Sugerencia: {selectedSuggestion}
                  </Button>
                )}
              </Box>

              {isLoading ? (
                <Box className="loading-spinner-container" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                  <CircularProgress className="loading-spinner" />
                </Box>
              ) : filteredVideos.length > 0 ? (
                <FilteredVideoList videos={filteredVideos} />
              ) : (
                <Typography style={{ marginLeft: '25px' }} variant="h5" >No se encontraron videos.</Typography>
              )}

<ThreeScene/>
            </Container>




          </Grid>


        </Grid>


        
      </Container>

      
      
    </div>
    
  );
};

export default App;
