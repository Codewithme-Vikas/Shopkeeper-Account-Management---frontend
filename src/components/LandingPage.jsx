import './LandingPage.css'

import Login from './Login'

import Carousel from "../components/helper/Crousel";

// images
import logo from "../assets/logo.png"

import canonPrinter from '../assets/crouselmage/canonPrinter.jpg'
import ecoMachine from '../assets/crouselmage/ecoMachine.jpg'
import flexMachine from '../assets/crouselmage/flexMachine.jpeg'

const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const imgs = [
    "hodingFlex-d1c863d1_aihnx1.png",
    "stickers-f1c72e75_h8nt10.png",
    "envelopes-7a0199c5_qyaezn.png",
    "standy-201b66ef_j5imuj.png",
    // "3dBoard-1528a010_vg34to.png",
    // "laterHead-74d8d13e_xlyp28.png",
    // "billBook-94423608_p9rb3b.png",
    // "canopy-25ec1517_sziimr.png",
    // "pamplet-1d28ad67_nnkb99.png",
    // "visitingCard-b6b38756_mutaxy.png",
    // "backLight-e844fd1e_yei077.png",
    // "tShirt-729c4c96_th7lph.png"
]

const LandingPage = () => {
    return (
        <div id='landingPage'>

            <header className="shadow-slate-300 shadow-lg mb-2 py-2">
                <div className="w-10/12 mx-auto flex  items-center justify-between">
                    <div>
                        <a className="text-lg font-semibold">
                            <img src={logo} alt="Logo" className="w-[90px]" />
                        </a>
                    </div>
                    <nav className="hidden sm:block">
                        <ul className="flex items-center justify-center gap-5">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            {/* <li>
                                <a href="#about">About us</a>
                            </li> */}
                            <li>
                                <a href="#footer">Contact us</a>
                            </li>
                            <li>
                                <a href="#services">Services</a>
                            </li>
                            <li>
                                <a href="#login">Login</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>


            <section id="home" className="w-full mb-4">

                <Carousel
                    img1={canonPrinter}
                    img2={ecoMachine}
                    img3={flexMachine}
                />
            </section>


            {/* <section id="about" className="w-10/12 mx-auto py-4">
                About section
                <p>We hae experince of 50years.</p>
            </section> */}


            <section id="services" className="w-10/12 mx-auto mb-6">
                <h1 className="text-center text-2xl my-3">Our Services</h1>

                <div className="flex justify-around gap-8  flex-wrap ">

                    {
                        imgs.map((img, index) => {
                            return (
                                <div key={index}
                                    className="shadow-lg shadow-slate-700 rounded-lg p-2"
                                >
                                    <img
                                        src={"https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359376/Shopkeeper%20account%20managment/" + img}
                                        alt={img}
                                        className="w-[300px] hover:scale-[1.05] duration-150"
                                    />
                                </div>
                            )
                        })
                    }



                </div>


            </section>


            <section id="login" className="w-10/12 mx-auto my-4 ">

                <Login />

            </section>




            <footer id="footer" className="bg-slate-300 text-center pb-4 text-sm">

                <div className="flex gap-12 justify-around">


                    <div className='flex w-1/2 justify-around p-4'>

                        {/* address & number */}
                        <div className="flex flex-col gap-4">

                            <div className="border-b-2 border-white">
                                <h2 className="text-2xl">Ritik Advertising</h2>
                            </div>

                            <div className="flex flex-col gap-1" >
                                <p className="text-base">Address : Silarpur Road, Dankaur, G.B. Nagar,</p>
                                <p className='text-base'>Uttar Pradesh</p>
                            </div>

                            <div className="flex flex-col text-lg border-b-2 border-white">
                                <p>+91 7755155020</p>
                                <p>+91 9412845464</p>
                                <p>yadav.ritik@gmail.com</p>
                            </div>
                        </div>

                        {/* middle ,links */}
                        <div className="flex flex-col gap-4 items-start">

                            <h2 className="text-lg">Menu</h2>

                            <ul className="flex flex-col gap-1 items-start">
                                <li>
                                    <a href="#home">Home</a>
                                </li>
                                {/* <li>
                                <a href="#about">About</a>
                            </li> */}
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>


                    {/* google map iframe */}
                    <div className="flex flex-col gap-4 flex-start">
                        <iframe
                            width="600"
                            height="250"
                            className='border-0'
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=place_id:ChIJrw6vZ9rHDDkRB5DHKeMdY2w`}>
                        </iframe>

                    </div>
                </div>

                <p className="text-sm mt-4"> copyright reserved <span className="font-bold">&copy;</span>  by <span className="font-semibold">Rititk advertising </span>
                    and Desgined by
                    <a href="mailto:vikashnagar2025@gmail.com" className="curosor-pointer font-semibold pl-1">
                        <span className="pl-1">Vikas Tech</span>
                    </a>
                </p>

            </footer>

        </div>
    )
}

export default LandingPage