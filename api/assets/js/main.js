$.ajax({
	type: "GET",
	url: `https://103.88.221.150:9439/api/bank/getAll`,
	responseType: "json",
	success: function (response) {
        console.log("api data=>", response);

        $.each(response, function (index, value) { 
            console.log("loop=>" , value);
            $("#bank-data tbody").append(`
            <tr>
                <td>${value.bankId}</td>
                <td>${value.bankName}</td>
                <td>${value.accountNumber}</td>
                <td>${value.ifscCode}</td>
                <td>${value.ipAddress}</td>
                <td>${value.activeStatus}</td> 
            </tr>            
            `);
             
        });

	},
    complete:function(){
        $("#bank-data").DataTable();
    }
    
	
})

function getBankData() {

    
}