import { IconHeartBeat } from "@/assets/icons/IconHeartBeat";
import { IconCalendar } from "@/assets/icons/IconCalendar";
import { LinkCard } from "@/components/linkCard/LinkCard";
import "./home.scss";

const linksCard = [
    {
        title: "Mis citas",
        url: "/my-appointments",
        icon: <IconHeartBeat width="90" height="90" />
    },
    {
        title: "Reservar cita",
        url: "/request-appointment",
        icon: <IconCalendar width="90" height="90" />
    },
];

const Home = () => {
    return (
        <div className="home">
            {
                linksCard.map((link, index) => (
                    <LinkCard
                        key={index}
                        title={link.title}
                        url={link.url}
                        icon={link.icon}
                    />
                ))
            }
        </div >
    );
}

export default Home;