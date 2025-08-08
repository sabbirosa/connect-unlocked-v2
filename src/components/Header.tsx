import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center py-6">
      <div className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Connect Unlocked 2.0
        </h1>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <a
          href="#"
          className="group flex items-center justify-center w-12 h-12 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary hover:scale-110 hover:shadow-lg"
        >
          <Linkedin
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </a>
        <a
          href="#"
          className="group flex items-center justify-center w-12 h-12 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary hover:scale-110 hover:shadow-lg"
        >
          <Instagram
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </a>
        <a
          href="#"
          className="group flex items-center justify-center w-12 h-12 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary hover:scale-110 hover:shadow-lg"
        >
          <Facebook
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
        </a>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
          <p className="text-muted-foreground text-sm font-medium">
            Live Status: Updating Every Minute
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-card/30 to-card/20 backdrop-blur-sm p-6 rounded-2xl">
        <p className="text-foreground mb-4 text-base leading-relaxed">
          We are building the future of academic course management:{" "}
          <span className="text-primary font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            BRACU O.R.A.C.L.E
          </span>
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-3 text-primary font-bold hover:text-primary transition-all duration-300 group"
        >
          <span className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <p>JOIN THE ARENA</p>
            <Send size={16} />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Header;
