// src/components/Navbar.jsx
function Navbar() {
  return (
    <nav className="sticky top-0 bg-[#008080] text-white shadow-md z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-lg font-bold">AWS Walkthrough</h1>
        <ul className="flex gap-6">
          <li><a href="#steps" className="hover:underline">Steps</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
