


const GradientBg = () => {
    return (
        <div className="isolate transform-gpu absolute inset-0 w-full">
            <div className="absolute inset-0 -z-10"></div>
                <svg 
                className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(75%_80%_at_top_center,white,transparent)]" 
                aria-hidden="true"
                >
                <defs>
                    <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
            </svg>
      </div>
    );
};

export default GradientBg;
