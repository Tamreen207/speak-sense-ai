const baseAvatarCatalog = [
	{
		id: "coach-alex",
		name: "Alex Morgan",
		role: "Technical Interview Coach",
		avatar: "👨‍💼",
		gender: "male",
		species: "human",
		style: "professional",
		color: "#4f46e5",
		bgColor: "linear-gradient(135deg, #4f46e5 0%, #1d4ed8 100%)",
	},
	{
		id: "coach-priya",
		name: "Priya Shah",
		role: "Behavioral Interview Coach",
		avatar: "👩‍💼",
		gender: "female",
		species: "human",
		style: "professional",
		color: "#db2777",
		bgColor: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
	},
	{
		id: "coach-noah",
		name: "Noah Reed",
		role: "Communication Specialist",
		avatar: "🧑‍🏫",
		gender: "male",
		species: "human",
		style: "mentor",
		color: "#059669",
		bgColor: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
	},
	{
		id: "coach-luna",
		name: "Luna Park",
		role: "Product Interviewer",
		avatar: "👩‍💻",
		gender: "female",
		species: "human",
		style: "modern",
		color: "#7c3aed",
		bgColor: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
	},
];

export const avatarCatalog = baseAvatarCatalog;

export const getFilteredAvatars = (filters = {}) => {
	const { gender, species, style, role } = filters;

	return baseAvatarCatalog.filter((avatar) => {
		if (gender && avatar.gender !== gender) return false;
		if (species && avatar.species !== species) return false;
		if (style && avatar.style !== style) return false;
		if (role && !String(avatar.role).toLowerCase().includes(String(role).toLowerCase())) return false;
		return true;
	});
};

export default avatarCatalog;
