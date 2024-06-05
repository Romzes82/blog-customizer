import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	setAppState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;
	const [isOpen, setOpen] = useState(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const toggleShowForm = () => {
		setOpen(!isOpen);
	};

	// сабмит формы
	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
	};

	// сброс формы
	const handleResetForm = () => {
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};

	// закрытие формы по по кликне вне ее и по esc
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleOutsideClick = (event: MouseEvent) => {
			// console.log(formRef?.current?.contains(event.target as Node));

			if (
				formRef.current &&
				!formRef?.current?.contains(event.target as Node)
			) {
				toggleShowForm();
			}
		};

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleShowForm();
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, toggleShowForm, formRef]);

	return (
		<>
			<ArrowButton isActive={isOpen} onClick={toggleShowForm} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>

					<Select
						title={'Шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						name={'fontSize'}
						title={'Размер шрифта'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
