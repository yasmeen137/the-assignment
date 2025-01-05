import Link from "next/link";

const Hero = () => {
    return (
        <section className="hero min-h-screen w-full relative flex items-center justify-center text-white">
            
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/upper-rank-moons-kimetsu-no-yaiba-moewalls-com.mp4" 
                autoPlay
                loop
                muted
                playsInline
            ></video>

           
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-50"></div>

       
            <div className="text-center relative z-10 bg-black bg-opacity-50 p-8 rounded-lg mx-4 md:mx-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Anime Insight
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-8">
                     All your anime insights in one place  
                            never miss a moment 
                </p>

                <Link href={'/anime'}>
                    <button className="px-6 py-3 bg-red-800 hover:bg-red-600 rounded text-lg font-semibold">
                        Explore Now
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
