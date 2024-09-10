import AlexPFP from '../../../public/AlexPFP.jpeg';
import VincentPFP from '../../../public/VincentPFP.png';
import MichaelPFP from '../../../public/MichaelPFP.jpg';
import JonathanPFP from '../../../public/JonathanPFP.jpeg';

import './MeetTheTeam.css';

export default function MeetTheTeam () {

    interface TeamMember {
        name: string;
        role: string;
        github: string;
        linkedin: string;
        img: string;
    }

    const teamMembers: TeamMember[] = [
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
    ]

    return (
        <section className="team-section">

            <h2 className="team-title">Meet the Team</h2>

            <div className="team-grid">
                {teamMembers.map((member) => (

                    <div className="team-card" key={member.name}>
                        <img
                            src={`${member.img}`}
                            alt={`${member.name} Profile`}
                            className="team-image"
                        />

                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>

                        <div className="team-links">
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}