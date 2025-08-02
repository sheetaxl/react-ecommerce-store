import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">About Our Store</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <strong>React E-Commerce Store</strong> – your go-to destination for quality products and seamless online shopping. We specialize in offering a wide range of clothing and accessories for Men, Women, and Kids.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          This project was built using <strong>React.js</strong> and <strong>Vite</strong>, with modern UI design powered by <strong>Tailwind CSS</strong>. It showcases dynamic routing, product filtering, and cart management using <strong>Context API</strong> and <strong>localStorage</strong>.
        </p>
        <p className="text-lg text-gray-700">
          Whether you’re exploring fashion trends or practicing front-end development, this site delivers a realistic shopping experience powered by data from the <strong>DummyJSON API</strong>.
        </p>
      </div>
    </>
  );
};

export default About;
