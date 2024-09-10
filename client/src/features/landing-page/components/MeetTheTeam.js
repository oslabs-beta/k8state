import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AlexPFP from '../../../public/AlexPFP.jpeg';
import VincentPFP from '../../../public/VincentPFP.png';
import MichaelPFP from '../../../public/MichaelPFP.jpg';
import JonathanPFP from '../../../public/JonathanPFP.jpeg';
import './MeetTheTeam.css';
export default function MeetTheTeam() {
    const teamMembers = [
        {
            name: 'Jonathan Wu',
            role: 'Full Stack Developer',
            github: 'https://github.com/Jon-Wu1',
            linkedin: 'https://www.linkedin.com/in/jonathan-wu1/',
            img: JonathanPFP
        },
        {
            name: 'Vincent Collis',
            role: 'Full Stack Developer',
            github: 'https://github.com/vincentcollis',
            linkedin: 'https://www.linkedin.com/in/vincentcollis/',
            img: VincentPFP
        },
        {
            name: 'Michael Chen',
            role: 'Full Stack Developer',
            github: 'https://github.com/mochamochaccino',
            linkedin: 'https://www.linkedin.com/in/michael-chen-345b4b1aa/',
            img: MichaelPFP
        },
        {
            name: 'Alex Greenberg',
            role: 'Full Stack Developer',
            github: 'https://github.com/AlexG0718',
            linkedin: 'https://www.linkedin.com/in/alex-greenberg-1530a812a/',
            img: AlexPFP
        }
    ];
    return (_jsxs("section", { className: "team-section", children: [_jsx("h2", { className: "team-title", children: "Meet the Team" }), _jsx("div", { className: "team-grid", children: teamMembers.map((member) => (_jsxs("div", { className: "team-card", children: [_jsx("img", { src: `${member.img}`, alt: `${member.name} Profile`, className: "team-image" }), _jsx("h3", { className: "team-name", children: member.name }), _jsx("p", { className: "team-role", children: member.role }), _jsxs("div", { className: "team-links", children: [_jsx("a", { href: member.github, target: "_blank", rel: "noopener noreferrer", children: "GitHub" }), _jsx("a", { href: member.linkedin, target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" })] })] }, member.name))) })] }));
}
