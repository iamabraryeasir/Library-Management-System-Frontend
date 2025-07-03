export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto py-8 px-5 lg:px-0">
      <div className="bg-green-500 py-20 flex flex-col items-center text-center rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-['Roboto'] mb-4">
          The Ultimate Solution for your Library Management
        </h1>
        <p className="text-lg md:text-xl text-green-100 font-['Roboto'] mb-8 max-w-xl">
          Streamline your library operations, manage books, and empower your
          community with ease.
        </p>
        <div className="flex gap-4">
          <button className="bg-green-400 hover:bg-green-300 text-white font-['Roboto'] font-semibold py-3 px-6 rounded shadow transition">
            Get Started
          </button>
          <button className="bg-white hover:bg-green-100 text-green-500 font-['Roboto'] font-semibold py-3 px-6 rounded shadow transition border border-green-400">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
