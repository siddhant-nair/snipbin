import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import SnippetGrid from './snippets/SnippetGrid'
import LanguagePage from './language/LanguagePage'
import { SnippetApis } from './models/snippetModel'
import SnippetPage from './snippets/SnippetPage'
import ErrorBoundary from './errors/ErrorPage'

const snippetApis = new SnippetApis();

async function snippetGridLoader({params: {language}}: any): Promise<any> {
	return await snippetApis.fetchAllSnippets(language)
}

async function languageLoader(): Promise<any> {
	return await snippetApis.fetchLanguages()
}

async function snippetLoader({params: {language, snippetTitle}}: any): Promise<any> {
	return await snippetApis.fetchSnippet(language, snippetTitle)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <LanguagePage />,
		loader: languageLoader,
	},
	{
		path: "/:language",
		element: <MainLayout />,
		// errorElement: <ErrorBoundary />,
		loader: snippetGridLoader,
		children: [
			{
				path:"/:language/:snippetTitle",
				element: <SnippetPage/>,
				loader: snippetLoader 
			},
			{
				path:"/:language",
				element: <SnippetGrid />,
			}
		]
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
