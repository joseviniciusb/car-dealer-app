export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <a
          href="https://github.com/joseviniciusb"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.683-.217.683-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.907-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.339-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.03-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.845c.852.004 1.709.115 2.51.338 1.91-1.296 2.75-1.026 2.75-1.026.545 1.377.202 2.394.1 2.647.641.7 1.03 1.592 1.03 2.683 0 3.842-2.339 4.687-4.565 4.935.36.31.682.921.682 1.855 0 1.338-.012 2.417-.012 2.744 0 .267.18.579.688.48A10.005 10.005 0 0 0 22 12c0-5.523-4.477-10-10-10Z"
            />
          </svg>
          <span className="font-medium">Visit my GitHub</span>
        </a>
      </div>
    </footer>
  );
};
