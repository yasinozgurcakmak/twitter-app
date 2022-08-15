import ProfileTwits from '../ProfileTwits/ProfileTwits';
import Tabs from '../Tabs/Tabs';
import ProfileReplies from '../ProfileReplies/ProfileReplies';
const Components = {
	t: <ProfileTwits />,
	r: <ProfileReplies />,
};

function ProfileContent() {
	return (
		<div>
			<Tabs
				defaultTab='t'
				name='profile-tabs'
				items={[
					{ value: 't', label: 'Twits' },
					{ value: 'r', label: 'Replies' },
				]}
				components={Components}
			/>
		</div>
	);
}

export default ProfileContent;
