import { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const buttonStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '20px',
        right: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1000,
        display: isVisible ? 'block' : 'none',
    };

const ArrowUp: React.FC<React.SVGProps<SVGSVGElement>> = () => (
    <svg
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="SVGRepo_iconCarrier">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                fill="#000000"
            />
        </g>
    </svg>
);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button aria-label='Voltar ao topo da pagina' id="button_BackToTop" onClick={scrollToTop} style={buttonStyle}><ArrowUp/></button>
    );
};

export default BackToTop;
