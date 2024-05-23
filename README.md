# File Storage App with Role-Based Authorization

Welcome to ShareSpace! This is a full-stack file storage application built with Next.js, ShadCN, and TypeScript. It supports organizations, file uploads, management, role-based authorization, authentication, and more. The app features a wide range of UI components, including dialogs, modals, toasts, dropdowns, and more.

## Features

- **Organizations**: Manage files within different organizations.
- **File Upload and Management**: Upload, delete, and manage files easily.
- **Role-Based Authorization**: Secure your files with role-based access control.
- **Authentication**: User authentication and management using Clerk.
- **UI Components**: Rich set of UI components including dialogs, modals, toasts, and dropdowns.
- **Favorites**: Mark files as favorites for quick access.
- **Trash Feature**: Restore or permanently delete files from trash.
- **Cron Jobs**: Automatic deletion of files with cron jobs.
- **Responsive Design**: A responsive and intuitive user interface.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TomasLaus/ShareSpace.git
   cd ShareSpace
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add your environment variables.

   ````env
    # Deployment used by `npx convex dev`


    CONVEX_DEPLOYMENT=

    NEXT_PUBLIC_CONVEX_URL=
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
   ````

### Running the App

1. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```
   and run Convex

   ```npx
   npx convex dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

- **/components**: Contains the React (Shadcn) components used in the app.
- **/pages**: Next.js pages for routing.
- **/styles**: Styling files for the application.
- **/utils**: Utility functions and helpers.
- **/hooks**: Custom React hooks.

## Live Demo

Check out the live demo of the app [here](https://sharespace-app.vercel.app/).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding!
