import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import SnippetPage from './snippets/SnippetPage'
import LanguagePage from './language/LanguagePage'
import { SnippetApis } from './models/snippetModel'

async function snippetLoader({params: {language}}: any): Promise<any> {
	return await new SnippetApis().fetchSnippets(language)
}

async function languageLoader(): Promise<any> {
	return await new SnippetApis().fetchLanguages()
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <LanguagePage />,
				loader: languageLoader,
			},
			{
				path: "/:language",
				index: true,
				element: <SnippetPage />,
				loader: snippetLoader,
			}
		]
	}
])

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
		<RouterProvider router={router} />
	// </StrictMode>,
)
