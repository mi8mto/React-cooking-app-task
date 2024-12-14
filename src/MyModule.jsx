import { useState } from 'react';
import styles from './MyModule.module.css';
import data from './data.json';

export const MyModule = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const handleNext = () => {
		if (!isLastStep) {
			setActiveIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (!isFirstStep) {
			setActiveIndex((prev) => prev - 1);
		}
	};

	const handleRestart = () => {
		setActiveIndex(0);
	};

	const goToStep = (index) => {
		setActiveIndex(index);
		// console.log(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
					</div>

					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={
									styles['steps-item'] +
									(index < activeIndex ? ` ${styles.done}` : '') +
									(index === activeIndex ? ` ${styles.active}` : '')
								}
							>
								<button
									onClick={() => goToStep(index)}
									className={styles['steps-item-button']}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>

					<div className={styles['buttons-container']}>
						<button
							onClick={() => handlePrevious()}
							className={styles.button}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{isLastStep ? (
							<button className={styles.button} onClick={handleRestart}>
								Начать сначала
							</button>
						) : (
							<button className={styles.button} onClick={handleNext}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
