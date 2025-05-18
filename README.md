A modern content management dashboard for creating, managing, and publishing articles. Built with React, Tailwind CSS, and shadcn/ui components.

## 📋 Features

- **Article Management**: Create, edit, delete, and view articles
- **Dashboard Analytics**: Track article metrics and performance
- **Account Switching**: Manage multiple websites/accounts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface with shadcn/ui components
- **Data Persistence**: Local storage for demo purposes (can be connected to a backend API)


## 🛠️ Tech Stack

- **React**: UI library
- **React Router**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Beautiful icons
- **Vite**: Fast build tool and development server
- **React Hot Toast**: Toast notifications


## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn


### Installation

1. Clone the repository

```shellscript
git clone https://github.com/yourusername/abun-dashboard.git
cd abun-dashboard
```


2. Install dependencies

```shellscript
npm install
# or
yarn
```


3. Start the development server

```shellscript
npm run dev
# or
yarn dev
```




## 📁 Project Structure

```plaintext
abun-dashboard/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── articles/       # Article-related components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layouts/        # Layout components
│   │   └── ui/             # UI components (shadcn/ui)
│   ├── context/
│   │   └── AppContext.jsx  # Global state management
│   ├── data/
│   │   └── articles-data.js # Sample data
│   ├── lib/
│   │   └── utils.js        # Utility functions
│   ├── pages/              # Page components
│   └── routes/             # Routing configuration
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── globals.css         # Global styles
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues


## 🌐 Deployment

### Build for Production

```shellscript
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.









## 🧩 Extending the Application

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/routes/AppRoutes.jsx`
3. Add a navigation link in `src/components/layouts/SideBar.jsx`



## 🐛 Troubleshooting

### Common Issues

- **Module not found errors**: Make sure all dependencies are installed

```shellscript
npm install
```


- **Styling issues**: Clear browser cache or check Tailwind configuration

```shellscript
npm run dev -- --force
```


- **Routing problems**: Check React Router configuration in `AppRoutes.jsx`
- **Component errors**: Check the console for specific error messages


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

Built with ❤️ by VILOK
