const items = [
  { id: 1, name: "Help" },
  { id: 2, name: "Status" },
  { id: 3, name: "About" },
  { id: 4, name: "Press" },
  { id: 5, name: "Blog" },
  { id: 6, name: "Privacy" },
  { id: 7, name: "Rules" },
  { id: 8, name: "Terms" },
];

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full border-t py-4">
      <div className="w-full h-full flex items-center justify-center gap-10">
        {items.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
