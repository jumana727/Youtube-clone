import React from 'react';

import { Grid} from '@material-ui/core';

import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';

class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null,

    }

    onLoad = async() =>{
        const response = await youtube.get('search' ,{ params: {
            part: 'snippet',
            maxResults: 12,
            key: 'AIzaSyApD98DZyqpBf_Nu_ydHdrb5i9LiU5Ys0c',
            chart: 'mostPopular',  
        }});
        this.setState({videos: response.data.items});

    }

    componentDidMount = () =>{
        
        this.onLoad();
        
        
    }

    onVideoSelect = (video) =>{
        this.setState({selectedVideo: video});
    }

    handleSubmit = async(searchTerm) =>{
        const response = await youtube.get('search' ,{ params: {
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyApD98DZyqpBf_Nu_ydHdrb5i9LiU5Ys0c',
            q: searchTerm,  
        }});

        console.log(response.data.items);

        this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
    }    

    render(){
        const {selectedVideo} = this.state;
        const {videos} = this.state;
        return(
            <Grid justifyContent="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;