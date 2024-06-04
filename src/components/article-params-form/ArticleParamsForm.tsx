import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);
	const toggleShowForm = () => {
		setOpen(!isOpen);
		console.log(`form is open =  ${isOpen}`);
	};

	return (
		<>
			<ArrowButton isActive={isOpen} onClick={toggleShowForm} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
