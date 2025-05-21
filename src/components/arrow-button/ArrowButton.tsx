import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	state: boolean;
	onClick: OnClick;
}

export const ArrowButton = ({ state, onClick }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, state ? styles.container_open : null)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, state ? styles.arrow_open : null)}
			/>
		</div>
	);
};
