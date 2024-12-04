import ReactGA from "react-ga4";


export const initializeGA = () => {
    ReactGA.initialize([
        {
            trackingId: "G-CZ2MMR7HRP",
        }
    ]);
};

export const trackPageview = (path, title) => {
    ReactGA.send({ hitType: "pageview", page: path, title });
};


export const trackEvent = ({ category, action, label, value }) => {
    ReactGA.event({
        category,
        action,
        label, 
        value,
    });
};
