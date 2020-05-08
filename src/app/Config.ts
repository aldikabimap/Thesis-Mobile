export var Config = {
	Developer		: false,
	signature		: "ae72e97648a54ad23675e7198bad05fa5da85780",
	mitra		: "1",
	URLServer		: "http://aplikasidiet.com/api/services",
	URL		: "http://aplikasidiet.com/services/",
	// URLServer		: "http://localhost/aldika_diet/api/services",
	// URL		: "http://localhost/aldika_diet/services/",
	loginStatus		: false,
	storageData : null,
	id_jenis:"",
	printCheckout:{},
	dataRekomendasi:{},
	selectedUser:'',
	selectedNameUser:'',
	connectionStatus : 0,
	base_url_barang:'',
	printerDevice 	: '',
	dataDesc:{},
	dataPlan:[],
	dataBooster:{},
	loginData 		: {
		"customer_id"				: "",
		"customer_first_name"		: "",
		"customer_last_name"		: "",
		"customer_email"			: "",
		"customer_phone"			: "",
		"customer_address"			: "",
		"customer_point"			: "",
		"customer_date_birth"		: "",
		"customer_password"			: "",
		"customer_date_register"	: "",
		"customer_status"			: "",
		"customer_pic"				: "",
		"customer_level"			: "20"
	},
	push_notification	: {
		enable	: false,
		token 	: '',
		options : {
			android: {
				senderID	: "299260665607",
				vibrate		: true,
				sound 		: true,
			},
			ios: {
				alert	: true,
				badge	: true,
				sound	: true
			},
			windows: {}
		}
	},
	device : {
		uuid 	: '',		
	}
};
