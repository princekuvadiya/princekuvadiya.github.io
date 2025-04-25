import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutPrince extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about prince" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="prince' education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="prince' skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="prince' projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="prince's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
                {/* <div className='my-0.5 w-28 md:w-full h-8 px-2 md:px-2.5 flex' >
                    <iframe src="https://github.com/sponsors/vivek9patel/button" title="Sponsor vivek9patel" width={"100%"} height={"100%"} ></iframe>
                </div> */}
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutPrince;

export const displayAboutPrince = () => {
    return <AboutPrince />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Prince Kuvadiya Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Prince Kuvadiya</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Full-Stack Developer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
  <li className="list-pc">
    I'm a <span className="font-medium">Full-Stack Developer</span> with hands-on experience in Flutter, Node.js, and React.js. I’ve interned as a Flutter Developer at <u>Webito Infotech</u> and am currently working as a Full-Stack Developer at <u>Ambrox Infotech</u>. I'm actively looking for full-time opportunities! (Reach out at <a className='text-underline' href='mailto:princekuvadiya.162@gmail.com'><u>@princekuvadiya.162@gmail.com</u></a> 😊)
  </li>
  <li className="mt-3 list-building">
    I love building end-to-end applications that solve real-world problems — from chat apps and ecommerce platforms to OCR-powered legal tools.
  </li>
  <li className="mt-3 list-time">
    Outside of coding, I enjoy watching <a href="https://www.youtube.com/channel/UCBa659QWEk1AI4Tg--mrJ2A" target="_blank" rel="noreferrer">Tom Scott’s videos</a>, reading tech blogs, or experimenting with Minecraft mods.
  </li>
  <li className="mt-3 list-star">
    I’m also passionate about Deep Learning, Computer Vision, and integrating OpenAI into innovative apps.
  </li>
</ul>

        </>
    )
}
function Education() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Government Polytechnic Gandhinagar
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">July 2021 - March 2024</div>
                    <div className="text-sm md:text-base">Diploma in Computer Engineering</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">CGPA &nbsp; 8.09</div>
                </li>
                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Shree Gadhapur Vidhyalaya
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">March 2021</div>
                    <div className="text-sm md:text-base">10<sup>th</sup> Grade - Gujarat Board</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Percentage &nbsp; 68%</div>
                </li>
            </ul>
        </>
    );
}

function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I'm experienced in building cross-platform apps, backend APIs, and full-stack systems using modern technologies.
                </li>
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>
                        My expertise lies in <strong className="text-ubt-gedit-orange">Flutter, Node.js, React.js, and AWS</strong>, with a strong grasp of scalable app architecture.
                    </div>
                </li>
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are some tools and technologies I frequently use:</div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4">
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Languages & Tools</div>
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Frameworks & Libraries</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000" alt="JavaScript" />
                        <img className="m-1" src="https://img.shields.io/badge/-Dart-0175C2?style=flat&logo=dart&logoColor=white" alt="Dart" />
                        <img className="m-1" src="https://img.shields.io/badge/-Java-%23ED8B00?style=flat&logo=java&logoColor=white" alt="Java" />
                        <img className="m-1" src="https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="Python" />
                        <img className="m-1" src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white" alt="C++" />
                        <img className="m-1" src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=firebase&logoColor=white" alt="Firebase" />
                        <img className="m-1" src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=white" alt="Git" />
                        <img className="m-1" src="https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" alt="Flutter" />
                        <img className="m-1" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white" alt="React" />
                        <img className="m-1" src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" />
                        <img className="m-1" src="https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white" alt="Express" />
                        <img className="m-1" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
                        <img className="m-1" src="https://img.shields.io/badge/-Redux-593D88?style=flat&logo=redux&logoColor=white" alt="Redux" />
                        <img className="m-1" src="https://img.shields.io/badge/-Socket.IO-010101?style=flat&logo=socket.io&logoColor=white" alt="Socket.io" />
                    </div>
                </div>
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span>And of course, I’m comfortable with</span> <img className="inline ml-1" src="https://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="Linux" /> <span>environments too!</span>
                </li>
            </ul>
        </>
    );
}


function Projects() {
    const project_list = [
        {
            name: "Lawyer Application (Patent Pending)",
            date: "Sep 2024 - Present",
            link: "https://github.com/princekuvadiya",
            description: [
                "OCR-powered app using OpenAI API to extract & organize legal data.",
                "Multi-platform data integration (Gmail, WhatsApp, SMS, IG, FB).",
                "Built complete backend with secure auth (Apple, FB, Google), Stripe integration.",
            ],
            domains: ["flutter", "node.js", "openai", "stripe", "firebase"]
        },
        {
            name: "On-Demand Service Marketplace",
            date: "Dec 2024 - Present",
            link: "https://github.com/princekuvadiya",
            description: [
                "Real-time multi-vendor service app built with Flutter & Node.js.",
                "Integrated Stripe payments, real-time chat, and negotiation system.",
                "Auth with Google, Apple, Facebook, and Phone/OTP."
            ],
            domains: ["flutter", "node.js", "socket.io", "stripe"]
        },
        {
            name: "Ecommerce D2C Application",
            date: "Apr 2024 - Dec 2024",
            link: "https://github.com/princekuvadiya",
            description: [
                "Full-stack ecommerce platform: user, vendor, admin panels.",
                "Built with Flutter, React.js, Node.js, MongoDB, PayPal, and JWT auth.",
                "End-to-end development from frontend to backend."
            ],
            domains: ["flutter", "react", "node.js", "mongodb", "paypal"]
        },
        {
            name: "Chat App",
            date: "Jan 2024 - Mar 2024",
            link: "https://github.com/princekuvadiya",
            description: [
                "Real-time messaging app with Google auth and Firebase backend.",
                "Built with Flutter and Firebase Realtime DB."
            ],
            domains: ["flutter", "firebase", "google-auth"]
        },
        {
            name: "Instagram Clone",
            date: "Jul 2023 - Sep 2023",
            link: "https://github.com/princekuvadiya",
            description: [
                "Instagram-like app with post creation, interaction & real-time updates.",
                "Email verification, Firebase Auth, and UI replication of the original app."
            ],
            domains: ["flutter", "firebase"]
        }
    ];
    

    const tag_colors = {
        "flutter": "blue-400",
        "firebase": "orange-400",
        "google-auth": "blue-500",
        "stripe": "purple-400",
        "node.js": "green-500",
        "react": "sky-400",
        "mongodb": "green-600",
        "paypal": "blue-600",
        "socket.io": "gray-400",
        "openai": "gray-200"
    }
    

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            {/* <iframe src="https://github.com/sponsors/vivek9patel/card" title="Sponsor princekuvadiya" className='my-4 w-5/6 md:w-3/4' ></iframe> */}

            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=princekuvadiya&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/resume.pdf" title="Prince Kuvadiya Resume" frameBorder="0"></iframe>
    )
}