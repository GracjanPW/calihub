import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        setWindowSize({
            height:window.innerHeight,
            width:window.innerWidth
        })
    },)

    useEffect(() => {
        console.log('useWindowSize: useEffect: addEventListener: resize');
        let timeoutId: NodeJS.Timeout;

        function handleResize() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 100);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize