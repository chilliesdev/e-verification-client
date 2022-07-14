import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="home-background">
      <NavBar />
      <Hero />
    </div>
  );
}
