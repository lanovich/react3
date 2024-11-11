import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react'

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [displayColor, setDisplayColor] = useState('black');

	const resetDisplayColor = () => setDisplayColor('black');

	const clickAtNumber = (content) => {
		resetDisplayColor();
		if (!operator) {
			setOperand1(prev => String(prev) + String(content))
		}
		else setOperand2(prev => String(prev) + String(content))
	}

	const clickAtOperator = (content) => {
		if (operand1) {
			setOperator(content);
			resetDisplayColor();

		}
	}

  const clickAtResult = () => {
		if (operand1 && operator && operand2) {
			setDisplayColor('rgb(27, 83, 44)')
      let result;
      const num1 = Number(operand1);
      const num2 = Number(operand2);

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
				case '/':
					result = num1 / num2;
				break;
        default:
          return;
      }

      setOperand1(result);
      setOperand2('');
      setOperator('');
    }
  };

	const clickAtReset = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		resetDisplayColor();
	}

	const clickValidation = (id, content) => {
		if (typeof(id) === 'number') clickAtNumber(content);
		else if (id === 'result') clickAtResult();
		else if (id === 'clear') clickAtReset();
		else clickAtOperator(content)
	}

	return (
		<div className={styles.calculator}>
		<div className={styles.display} id="display" style={{ color: displayColor }}>{operand1}{operator}{operand2}</div>
		{data.map(({ id, content }) => {
			return (
				<button
				className={typeof(id) === "number" ? styles.button : `${styles.button} ${styles[id]}`}
				onClick={() => clickValidation(id, content)}
				key={id}
				>
					{content}
				</button>
			)
		})}
		</div>
	);
}
