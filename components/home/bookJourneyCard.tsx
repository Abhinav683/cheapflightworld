import { Sparkles ,MoveRight } from 'lucide-react';

export default function BookJourneyCard() {
    return (
        <section className="w-full py-8">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex flex-col md:flex-row items-center justify-between 
        rounded-3xl p-10 md:p-14
        bg-gradient-to-r from-[#111827] to-[#C89B3C]">

                    <div className="max-w-xl text-white">
                    <div className="bg-[#EEE9DF] flex gap-2 w-fit px-3 py-1 font-semibold rounded-full text-sm text-gray-800 mb-4">
                        <Sparkles size={16} />
                        Ready for your next adventure?
                    </div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Turn dream
                            destinations into
                            your next confirmed
                            getaway            </h2>

                        <p className="mt-4 text-gray-200">
                            Explore curated trips, discover premium stays, and start planning
                            your next escape with a simple booking experience.            </p>

                        <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-md">
                            Book a journey    < MoveRight size={18} />       </button>
                    </div>

                    {/* Right Image */}
                    <div className="mt-10 md:mt-0 border-14-white rounded-22xl shadow-lg">
                        <img
                            src="/plane1.jpg"
                            alt="travel"
                            className="w-[280px] md:w-[350px] object-contain"
                        />
                    </div>

                </div>

            </div>
        </section>
    )
}