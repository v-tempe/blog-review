import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';


const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояния страницы
	const [fontFamilyValue, setFontFamilyValue] = useState<string>(
		defaultArticleState.fontFamilyOption.value
	);
	const [fontColorValue, setFontColorValue] = useState<string>(
		defaultArticleState.fontColor.value
	);
	const [backgroundColorValue, setBackgroundColorValue] = useState<string>(
		defaultArticleState.backgroundColor.value
	);
	const [contentWidthValue, setContentWidthValue] = useState<string>(
		defaultArticleState.contentWidth.value
	);
	const [fontSizeValue, setFontSizeValue] = useState<string>(
		defaultArticleState.fontSizeOption.value
	);

	useEffect(() => {
		setFontFamilyValue(articleState.fontFamilyOption.value);
		setFontColorValue(articleState.fontColor.value);
		setBackgroundColorValue(articleState.backgroundColor.value);
		setContentWidthValue(articleState.contentWidth.value);
		setFontSizeValue(articleState.fontSizeOption.value);
	}, [articleState]);

	const handleChange = (changedArticleState: ArticleStateType) => {
		setArticleState(changedArticleState);
	};
	
	// fixed open click
	const [isOpen, setIsOpen] = useState(false);
	
	const handleClickOutside = () => {
		setIsOpen(false);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamilyValue,
					'--font-size': fontSizeValue,
					'--font-color': fontColorValue,
					'--container-width': contentWidthValue,
					'--bg-color': backgroundColorValue,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={articleState} onChange={handleChange} onOpenChange={setIsOpen}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
