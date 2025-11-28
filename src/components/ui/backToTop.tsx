import {useState, useEffect} from 'react';
import {Button} from "./button.tsx";
import {ArrowUp} from "lucide-react";

const BackToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const checkScrollHeight = () => {
            if (!showButton && window.pageYOffset > 400) {
                setShowButton(true);
            } else if (showButton && window.pageYOffset <= 400) {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', checkScrollHeight);
        return () => {
            window.removeEventListener('scroll', checkScrollHeight);
        };
    }, [showButton]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <Button variant="outline"
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 rounded-xl text-white hover:bg-white/20 hover:text-white transition-all duration-300 hover:shadow-md"
                onClick={scrollToTop} style={
            {
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                zIndex: 1000,
                display: showButton ? 'flex' : 'none',
            }}>
            <ArrowUp className="h-5 w-5"/>
        </Button>
    );
};

export default BackToTopButton;