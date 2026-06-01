# Admin Panel for Blog Management

Complete admin panel for managing and uploading blog posts to your travel platform.

## Features

- ✅ **Create Blog Posts** - Full form with title, content, category, author, and thumbnail
- ✅ **View All Blogs** - List of all created blog posts with status and metadata
- ✅ **Delete Blogs** - Remove blog posts from the system
- ✅ **Auto-slug Generation** - Automatically generates URL-friendly slugs from titles
- ✅ **Draft & Publish** - Save as draft or publish immediately
- ✅ **Category Management** - Organize blogs by predefined categories

## Setup Instructions

### 1. Install Dependencies (if Prisma is not yet installed)

The project already has Prisma Client included. You may need to reinstall dependencies:

```bash
npm install
```

### 2. Initialize the Database

Run the Prisma migration to create the database schema:

```bash
npx prisma migrate dev --name init
```

This will:
- Create the SQLite database at `prisma/dev.db`
- Create the `Blog` table with the necessary schema
- Generate Prisma Client

### 3. Access the Admin Panel

Navigate to: `http://localhost:3000/admin`

## File Structure

```
app/
├── (admin)/
│   └── admin/
│       └── page.tsx                    # Main admin page with tabs
├── api/
│   └── blogs/
│       ├── route.ts                    # Create & list blogs API
│       └── [id]/
│           └── route.ts                # Delete blog API
└── blog/
    └── [category]/[slug]/              # Blog detail page (existing)

components/
├── admin/
│   ├── blog-upload-form.tsx           # Blog creation form
│   └── blogs-list.tsx                  # List of all blogs
└── ui/
    └── tabs.tsx                        # Tab component for UI

prisma/
└── schema.prisma                       # Database schema
```

## API Endpoints

### Create Blog POST
**Endpoint:** `POST /api/blogs`

**Request Body:**
```json
{
  "title": "Best Beaches in Bali",
  "category": "Destination",
  "content": "Full blog content here...",
  "excerpt": "Short summary (optional)",
  "author": "John Doe",
  "thumbnail": "https://example.com/image.jpg",
  "published": true
}
```

**Response:**
```json
{
  "id": "clx123abc",
  "title": "Best Beaches in Bali",
  "slug": "best-beaches-in-bali",
  "category": "Destination",
  "content": "...",
  "excerpt": "...",
  "author": "John Doe",
  "thumbnail": "...",
  "published": true,
  "views": 0,
  "createdAt": "2026-05-26T10:00:00Z",
  "updatedAt": "2026-05-26T10:00:00Z"
}
```

### Get All Blogs
**Endpoint:** `GET /api/blogs`

**Response:**
```json
[
  {
    "id": "clx123abc",
    "title": "...",
    ...
  }
]
```

### Delete Blog
**Endpoint:** `DELETE /api/blogs/[id]`

## Database Schema

```prisma
model Blog {
  id        String     @id @default(cuid())
  title     String
  slug      String     @unique
  category  String
  content   String
  excerpt   String
  thumbnail String?
  author    String
  published Boolean    @default(false)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

## Features & Components

### BlogUploadForm Component
- Text inputs for title, author, and thumbnail URL
- Rich textarea for content
- Category dropdown selector
- Excerpt field (optional, auto-generated from content)
- Publish toggle
- Form validation and error handling
- Success/error message display
- Loading state with spinner

### BlogsList Component
- Displays all blog posts in a grid layout
- Shows publication status (Published/Draft)
- Displays view count
- Quick actions: View, Edit (coming soon), Delete
- Error handling and loading states
- Responsive design for mobile and desktop

## Usage

### Creating a Blog Post

1. Go to `/admin`
2. Click on the "Create Blog" tab
3. Fill in the form with:
   - Title
   - Category
   - Author name
   - Thumbnail URL (optional)
   - Excerpt (optional - will auto-generate if left blank)
   - Content (full blog text)
4. Toggle "Publish immediately" if you want it live, otherwise save as draft
5. Click "Create Blog"

### Managing Existing Blogs

1. Go to `/admin`
2. Click on the "All Blogs" tab
3. View all your blog posts with metadata
4. Use action buttons to:
   - **View** - Open the blog in a new tab
   - **Delete** - Remove the blog post
   - **Edit** - Coming soon

## Viewing Published Blogs

Once a blog is published, it's automatically accessible at:
`/blog/[category]/[slug]`

For example:
- `/blog/Destination/best-beaches-in-bali`
- `/blog/Tips & Tricks/packing-hacks`

## Next Steps (Optional Enhancements)

1. **Authentication** - Add authorization to admin panel
2. **Edit Functionality** - Update existing blog posts
3. **Image Upload** - Direct image upload instead of URLs
4. **Rich Text Editor** - Replace textarea with rich text editor
5. **SEO Optimization** - Add meta tags and descriptions
6. **Comments** - Enable user comments on blog posts
7. **Search** - Add search functionality to admin panel
8. **Pagination** - Paginate blogs list for better performance

## Environment Variables

Make sure your `.env` file includes:

```env
DATABASE_URL="file:./dev.db"
```

## Troubleshooting

### Database not found
- Run `npx prisma migrate dev --name init`

### Prisma Client issues
- Run `npx prisma generate`

### API errors
- Check browser console for detailed error messages
- Verify all required fields are filled in the form

## Support

For issues or questions about the admin panel, check the component files:
- Form logic: [components/admin/blog-upload-form.tsx](components/admin/blog-upload-form.tsx)
- List logic: [components/admin/blogs-list.tsx](components/admin/blogs-list.tsx)
- API routes: [app/api/blogs/route.ts](app/api/blogs/route.ts)
