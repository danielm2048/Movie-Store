import React from "react";
import AddMovie from "./AddMovie";
import { AdminButton } from "../../style/styledModal";

const AdminSection = () => {
	return (
		<div style={{ marginTop: "20px" }}>
			<AddMovie />
			<AdminButton>Update a Movie</AdminButton>
			<AdminButton>Change user authorization</AdminButton>
		</div>
	);
};

export default AdminSection;
