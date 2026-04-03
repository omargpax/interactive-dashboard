import react from "react";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center gap-4 py-6 text-center text-white pointer-events-auto md:flex-row md:gap-x-12 bg-gradient-to-t from-black/50 to-transparent">
            <a
                href="https://omargpax.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-[#4b5563] text-center tracking-widest uppercase inline-flex justify-center transition-colors cursor-pointer hover:text-white"
            >
                <span>Developed by <b>@omargpax</b> </span>
            </a>
        </footer>
    );
};

export default Footer;