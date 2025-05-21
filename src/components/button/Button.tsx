import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button
			className={type === 'reset' ? styles.reset_button : styles.submit_button}
			type={type}
			onClick={(e) => {
				if (onClick) onClick(e);
			}}>
			<Text weight={800} uppercase dynamicButton>
				{title}
			</Text>
		</button>
	);
};
