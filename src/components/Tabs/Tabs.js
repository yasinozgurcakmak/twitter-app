import { useState } from 'react';
import Card from '../Card/Card';
import s from './Tabs.module.scss';

function Tab({ children, value, name, onSelect, checked }) {
	return (
		<div className={s.tab}>
			<input
				id={value}
				value={value}
				type='radio'
				name={name}
				onChange={onSelect}
				checked={checked}
			/>
			<label htmlFor={value}>{children}</label>
		</div>
	);
}

function Tabs({ items, name, components, defaultTab = null }) {
	const [selectedTab, setSelectedTab] = useState(defaultTab);

	const selectTab = e => {
		setSelectedTab(e.target.value);
	};

	return (
		<>
			<Card>
				<div className={s.tabsWrapper}>
					{items.map(item => (
						<Tab
							value={item.value}
							name={name}
							onSelect={selectTab}
							checked={selectedTab === item.value}
							key={item.value}
						>
							{item.label}
						</Tab>
					))}
				</div>
			</Card>

			<div className={s.contentWrapper}>{components[selectedTab]}</div>
		</>
	);
}

export default Tabs;
