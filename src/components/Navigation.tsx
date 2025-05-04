
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Search, X, LogIn } from "lucide-react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { Button } from "./ui/button";

const categories = [
  { name: "Home", path: "/" },
  { name: "ML", path: "/topics/ml" },
  { name: "CV", path: "/topics/cv" },
  { name: "NLP", path: "/topics/nlp" },
  { name: "RL", path: "/topics/rl" },
  { name: "Podcasts", path: "/podcasts" },
  { name: "Saved", path: "/saved" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);
  
  const scrollToAuth = () => {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <nav className="sticky top-0 z-50 glass px-4 py-3 backdrop-blur-md bg-white/70 dark:bg-zinc-800/60 border border-white/20 dark:border-white/10 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden btn-neumorph flex items-center justify-center w-10 h-10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map(category => (
              <NavLink
                key={category.path}
                to={category.path}
                className={({ isActive }) => 
                  `font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground"
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center"
              onClick={scrollToAuth}
            >
              <LogIn size={16} className="mr-2" />
              Login
            </Button>
            <button
              className="btn-neumorph flex items-center justify-center w-10 h-10"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass absolute left-0 right-0 top-full p-4 animate-fade-in backdrop-blur-md bg-white/70 dark:bg-zinc-800/60 border-t border-white/20 dark:border-white/10 shadow-sm">
            <div className="flex flex-col space-y-4">
              {categories.map(category => (
                <NavLink
                  key={category.path}
                  to={category.path}
                  className={({ isActive }) => 
                    `px-4 py-2 font-medium rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </NavLink>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                  scrollToAuth();
                }}
              >
                <LogIn size={16} className="mr-2" />
                Login / Register
              </Button>
            </div>
          </div>
        )}
        
        {/* Search Overlay */}
        {showSearch && (
          <div className="fixed inset-0 glass z-50 flex items-start justify-center p-6 animate-fade-in">
            <div className="w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Search</h2>
                <button
                  className="btn-neumorph flex items-center justify-center w-10 h-10"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
