import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import SnippetPage from './snippets/SnippetPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			// {
			// 	index: true
			// 	element: <LanguagePage />
			// },
			{
				path: "/:language",
				index: true,
				element: <SnippetPage />
			}
		]
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
