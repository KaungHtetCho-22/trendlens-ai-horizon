
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Search, X, LogIn, LogOut, User } from "lucide-react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);
  
  const scrollToAuth = () => {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're not on the home page, navigate to it first
      navigate('/#auth-section');
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false); // Close mobile menu if open
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
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
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  <User size={16} className="inline mr-1" /> 
                  {user.email?.split('@')[0]}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex items-center"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center"
                onClick={scrollToAuth}
              >
                <LogIn size={16} className="mr-2" />
                Login
              </Button>
            )}
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
        
        {/* Mobile Navigation - Improved with better glassmorphism */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-[57px] p-4 z-50 animate-fade-in backdrop-blur-md bg-white/80 dark:bg-zinc-800/80 border-t border-white/20 dark:border-white/10 shadow-md">
            <div className="flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
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
              
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    <User size={16} className="inline mr-2" /> 
                    Signed in as {user.email}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 flex items-center justify-center"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
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
              )}
            </div>
          </div>
        )}
        
        {/* Search Overlay */}
        {showSearch && (
          <div className="fixed inset-0 glass z-50 flex items-start justify-center p-6 animate-fade-in backdrop-blur-md bg-white/80 dark:bg-zinc-800/80">
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
