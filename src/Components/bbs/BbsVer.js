import React, { useEffect, useState, useContext } from "react";
import axios from "axios";




function BbsVer() {
    const [line, setLine]=useState("")


	const getBbsVer = async () => {

        await axios.get(`/api`)
		.then((resp) => {
			console.log("[BbsDetail.js] getBbsver() success :D");
			console.log(resp.data)

			setLine(resp.data);
		})
		.catch((err) => {
			console.log("[BbsDetail.js] getBbsver() error :<");

			console.log(err);
		});

	}
	

	
	useEffect(() => {
		getBbsVer();
	}, []);

	return (
		line
    )
};

export default BbsVer;