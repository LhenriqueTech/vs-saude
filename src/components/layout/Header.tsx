const Header = () => {
    return (
      <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-semibold text-gray-700">Bem-vindo, Doutor(a)</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">admin@vssaude.com</span>
          <img
            src="https://ui-avatars.com/api/?name=Dr+VS&background=0D8ABC&color=fff"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    );
  };
  
  export default Header;
  