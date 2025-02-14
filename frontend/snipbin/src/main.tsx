import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import SnippetGrid from './snippets/SnippetGrid'
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
		element: <LanguagePage />,
		loader: languageLoader,
	},
	{
		path: "/:language",
		element: <MainLayout />,
		loader: snippetLoader,
		children: [
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
