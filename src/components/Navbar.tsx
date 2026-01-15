import { NavLink } from "@/components/NavLink";
import { Compass, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Added hook

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/visualizer", label: "Visualizer" },
    { to: "/learn", label: "Learn" },
    { to: "/tutorials", label: "Tutorials" },
    { to: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          { }
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/public/logo.png" alt="Algoo Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-black">Algoo</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                activeClassName="text-black font-semibold"
              >
                {item.label}
              </NavLink>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4 border-l border-gray-200 pl-4">
              {user ? (
                <>
                  <NavLink to="/dashboard">
                    <Button variant="outline" size="sm" className="border-black hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </NavLink>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 hover:text-black">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button size="sm" className="bg-black hover:bg-black/90">
                      Sign Up
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 animate-fade-in border-t border-gray-200">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-all"
                activeClassName="text-black bg-gray-100 font-semibold"
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
              {user ? (
                <>
                  <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-black hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    variant="ghost"
                    className="w-full hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full hover:bg-gray-100">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-black hover:bg-black/90">
                      Sign Up
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

