import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfileReplies } from "../../api";
import s from './ProfileReplies.module.scss';
import ReplyCard from '../ReplyCard/ReplyCard';

function ProfileReplies() {
	const { userId } = useParams();
	const [replies, setReplies] = useState(null);

	const fetchReplies = async () => {
		const data = await fetchProfileReplies(userId);

		setReplies(data.data);
	};

	useEffect(() => {
		fetchReplies();
	}, [userId]);

	return replies && replies.length ? (
		<div className={s.repliesWrapper}>
			{replies.map(reply => (
				<ReplyCard key={reply.id} reply={reply} />
			))}
		</div>
	) : (
		<div>
			<h1>No Replies found</h1>
		</div>
	);
}

export default ProfileReplies;
