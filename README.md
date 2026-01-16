# ProductHub - Next.js E-Commerce Application

A modern, full-featured producthub application built with Next.js 15 (App Router), featuring authentication, product listings, and a beautiful responsive design.

## 🚀 Live Demo

- **Live Site**: [Deploy on Vercel](https://vercel.com)
- **GitHub Repository**: [Your Repository URL]

## 📋 Project Description

ProductHub is a modern e-commerce platform where users can browse items, view detailed product information, and list their own items for sale. The application features a clean, professional design with dark mode support, smooth animations, and an intuitive user interface.

## ✨ Features Implemented

### Core Features

1. **Landing Page** ✅
   - Hero section with call-to-action
   - How it Works section
   - Featured Categories
   - Trending Items showcase
   - Why Choose Us section
   - Customer Testimonials
   - Statistics section
   - Newsletter subscription
   - Navbar with navigation links (Home, Items, Add Item, Login)
   - Comprehensive Footer

2. **Authentication** ✅
   - Mock login system with hardcoded credentials
   - Cookie-based session management
   - Protected routes for authenticated users
   - Automatic redirect for unauthenticated access
   - Login credentials:
     - **Email**: `admin@example.com`
     - **Password**: `password123`

3. **Item List Page** ✅
   - Publicly accessible
   - Displays all available items
   - Product cards with name, description, price, image, and ratings
   - Responsive grid layout
   - Pagination UI
   - Hover effects and animations

4. **Item Details Page** ✅
   - Publicly accessible
   - Full product information display
   - Large product image
   - Detailed description
   - Key features list
   - Pricing with discount display
   - Related products section
   - Add to cart and wishlist buttons

5. **Protected Page: Add Item** ✅
   - Only accessible when logged in
   - Form to add new items with fields:
     - Item Name
     - Description
     - Price
     - Category
     - Image URL
   - Image preview functionality
   - Form validation
   - Success toast notification
   - Redirects unauthenticated users to login

### Additional Enhancements

- **Responsive Design**: Fully responsive across all devices
- **Dark Mode Support**: Complete dark mode implementation
- **Modern UI/UX**: Beautiful design with Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- **Framework**: Next.js 15.1.2 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Hooks
- **Cookie Management**: js-cookie
- **Icons**: React Icons (Font Awesome, Material Design)
- **Fonts**: Google Fonts (Manrope)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd nextjs-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🗺️ Route Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with 7 sections |
| `/login` | Public | Login page with mock authentication |
| `/items` | Public | List of all items/products |
| `/items/[id]` | Public | Detailed view of a single item |
| `/add-item` | Protected | Form to add new items (requires login) |

## 🔐 Authentication

The application uses a simple mock authentication system:

- **Login Credentials**:
  - Email: `admin@example.com`
  - Password: `password123`

- **Session Management**: Uses cookies to store authentication token
- **Protected Routes**: `/add-item` requires authentication
- **Auto-redirect**: Unauthenticated users are redirected to login page

## 📁 Project Structure

```
nextjs-task/
├── app/
│   ├── layout.js              # Root layout with metadata
│   ├── page.js                # Landing page (7 sections)
│   ├── globals.css            # Global styles
│   ├── login/
│   │   └── page.js            # Login page
│   ├── items/
│   │   ├── page.js            # Items list page
│   │   └── [id]/
│   │       └── page.js        # Item details page
│   └── add-item/
│       └── page.js            # Add item page (protected)
├── components/
│   ├── Navbar.js              # Navigation component
│   └── Footer.js              # Footer component
├── lib/
│   └── data.js                # Mock items data
├── pages/                     # Original HTML templates
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: `#135bec` (Blue)
  - Background Light: `#f6f6f8`
  - Background Dark: `#101622`

- **Typography**: Manrope font family
- **Icons**: Material Symbols Outlined
- **Animations**: Smooth transitions and hover effects
- **Layout**: Responsive grid system with Tailwind CSS

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Environment Variables

No environment variables are required for the basic setup. For production:

- Add your API endpoints
- Configure database connections
- Set up authentication providers (NextAuth.js)

## 📝 Future Enhancements

- [ ] Implement NextAuth.js for Google OAuth
- [ ] Connect to Express.js backend API
- [ ] Add MongoDB database integration
- [ ] Implement real shopping cart functionality
- [ ] Add user profile pages
- [ ] Implement search and filter functionality
- [ ] Add payment integration (Stripe)
- [ ] Email notifications
- [ ] Order management system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Next.js documentation and community
- Tailwind CSS for the amazing utility-first framework
- Google Fonts and Material Symbols for typography and icons

---

**Note**: This is a demonstration project. The authentication system uses mock credentials and cookies for simplicity. In a production environment, implement proper authentication with NextAuth.js or similar solutions, and use a real database for data persistence.
