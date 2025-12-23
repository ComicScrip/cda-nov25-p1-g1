import background1 from "@/Images/backgroud1.png";

export default function Background1() {
    return (
        <div
            className="min-h-screen w-full"
            style={{
                backgroundImage: `url(${background1.src})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        />
    );
}
