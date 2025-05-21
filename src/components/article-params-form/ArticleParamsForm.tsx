import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState, useRef } from 'react';
import { Spacing } from '../spacing';
import { Select } from '../select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onChange: (changedArticleState: ArticleStateType) => void;
	onOpenChange: any
}

export const ArticleParamsForm = ({
	articleState,
	onChange,
	onOpenChange
}: ArticleParamsFormProps) => {
	// Открытие и закрытие
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggle = () => setIsOpen(!isOpen);

	useEffect(() => {
		setIsOpen(false);
	}, [articleState]);

	// Состояния элементов формы
	const [fontFamilyValue, setFamilyValue] = useState<OptionType>(
		articleState.fontFamilyOption
	);
	const [fontSizeValue, setFontSizeValue] = useState<OptionType>(
		articleState.fontSizeOption
	);
	const [fontColorValue, setFontColorValue] = useState<OptionType>(
		articleState.fontColor
	);
	const [backgroundColorValue, setBackgroundColorValue] = useState<OptionType>(
		articleState.backgroundColor
	);
	const [contentWidthValue, setContentWidthValue] = useState<OptionType>(
		articleState.contentWidth
	);
	
	const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      onOpenChange?.(false); // Обновляем состояние родительского компонента
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
	
	return (
		<>
			<ArrowButton state={isOpen} onClick={toggle} />
			<aside
        			ref={modalRef}
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}	
				role="dialog"
				aria-modal="true"
				aria-hidden={!isOpen}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true} family='open-sans'>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						selected={fontFamilyValue}
						options={fontFamilyOptions}
						onChange={setFamilyValue}
						title='ШРИФТ'
					/>
					<Spacing size={50} />
					<RadioGroup
						name='font-sizes'
						selected={fontSizeValue}
						options={fontSizeOptions}
						onChange={setFontSizeValue}
						title='РАЗМЕР ШРИФТА'
					/>
					<Spacing size={50} />
					<Select
						selected={fontColorValue}
						options={fontColors.filter(
							(color) => color.value !== backgroundColorValue.value
						)}
						onChange={setFontColorValue}
						title='ЦВЕТ ШРИФТА'
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						selected={backgroundColorValue}
						options={backgroundColors.filter(
							(color) => color.value !== fontColorValue.value
						)}
						onChange={setBackgroundColorValue}
						title='ЦВЕТ ФОНА'
					/>
					<Spacing size={50} />
					<Select
						selected={contentWidthValue}
						options={contentWidthArr}
						onChange={setContentWidthValue}
						title='ШИРИНА КОНТЕНТА'
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								onChange(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								onChange({
									fontFamilyOption: fontFamilyValue,
									fontSizeOption: fontSizeValue,
									fontColor: fontColorValue,
									backgroundColor: backgroundColorValue,
									contentWidth: contentWidthValue,
								});
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
