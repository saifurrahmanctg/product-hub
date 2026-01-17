#!/bin/bash

# Function to commit if files exist
commit_batch() {
    local msg="$1"
    shift
    local files=("$@")
    
    for file in "${files[@]}"; do
        if [ -e "$file" ] || [ -d "$file" ]; then
            git add "$file"
        fi
    done
    
    if ! git diff --cached --quiet; then
        git commit -m "$msg"
    else
        echo "No changes to commit for: $msg"
    fi
}

echo "Starting segmented commits..."

# 1. Project infrastructure
commit_batch "chore: initialize project configuration and infrastructure" \
    "package.json" "package-lock.json" "README.md" ".gitignore" "next.config.mjs" "jsconfig.json" "postcss.config.js" "tailwind.config.js"

# 2. Database and Utilities
commit_batch "feat: implement database connection and core utilities" \
    "lib/db.js" "lib"

# 3. Core Components (Layout)
commit_batch "feat: create common components - Navbar, Footer, and ThemeToggle" \
    "components/Navbar.js" "components/Footer.js" "components/ThemeToggle.js"

# 4. Global Styles and Layout
commit_batch "feat: setup global styles and main layout configuration" \
    "app/layout.js" "app/globals.css" "app/favicon.ico"

# 5. Landing Page
commit_batch "feat: design and implement the Home page with trending products" \
    "app/page.js"

# 6. Authentication Components
commit_batch "feat: implement user registration and login pages" \
    "app/login/page.js" "app/register/page.js"

# 7. Authentication API
commit_batch "feat: develop backend API for user authentication and session management" \
    "app/api/auth"

# 8. Product Listing Page
commit_batch "feat: implement main product marketplace listing page" \
    "app/products/page.js" "components/ProductsPageContent.js"

# 9. Product Details Page
commit_batch "feat: implement interactive product detail view" \
    "app/products/[id]/page.js" "components/ProductActions.js"

# 10. Dashboard Infrastructure
commit_batch "feat: setup dashboard layout and sidebar navigation" \
    "app/dashboard/layout.js" "components/Sidebar.js"

# 11. Dashboard Overview
commit_batch "feat: implement dashboard overview with activity stats" \
    "app/dashboard/page.js"

# 12. My Listings Management
commit_batch "feat: allow users to manage their product listings" \
    "app/dashboard/my-listings/page.js"

# 13. Add Product Feature
commit_batch "feat: implement multi-step product listing creation" \
    "app/dashboard/add-product/page.js"

# 14. Favorites Management
commit_batch "feat: implement personal favorites/wishlist functionality" \
    "app/dashboard/favorites/page.js"

# 15. Products API Core
commit_batch "feat: develop core products API for CRUD operations" \
    "app/api/products/route.js"

# 16. Dynamic Product API
commit_batch "feat: implement dynamic product routing for updates and deletions" \
    "app/api/products/[id]/route.js"

# 17. Cart Functionality
commit_batch "feat: implement shopping cart management and state persistence" \
    "app/cart/page.js"

# 18. Orders API
commit_batch "feat: develop backend API for order processing and persistence" \
    "app/api/orders/route.js"

# 19. Order History Feature
commit_batch "feat: implement order tracking and purchase history for users" \
    "app/dashboard/order-history/page.js"

# 20. Brand Identity and Final Polish
commit_batch "style: update brand identity to ProductHub and final UI refinements" \
    "rename_script.js" ".env.example" "public" "components" "app"

echo "Commits completed. Trying to push to main..."
git push -u origin main
