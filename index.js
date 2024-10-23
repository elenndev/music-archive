const home = document.querySelector('a.home')
if (window.location.pathname == "/") {
    home.classList.add('current-page')
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        allowtransparency: 'true',
        height: '100%',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
    };
    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
};

