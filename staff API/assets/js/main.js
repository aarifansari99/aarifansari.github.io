$.ajax({
    type: "GET",
    url: `http://103.88.221.150:9439/api/staff`,
    data: "data",
    dataType: "json",
    success: function (response) {
        console.log("api=>", response);
        $.each(response, function (index, value) { 
             console.log("loop=>", value);
             $("#staff tbody").append(`
        <tr>
            <td>${value.staffId}</td>
            <td>${value.staffName}</td>
            <td>${value.email}</td>
            <td>${value.contactNumber}</td>
            <td>${value.address}</td>
        </tr>
        
        `);
        });
        
    },
    complete:function(){
        $("#staff").DataTable();
    }
});

function getStaffData() {
    
}

$("#add").on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: `http://103.88.221.150:9439/api/staff`,
        dataType: "json",
        contentType:"application/json",
        data: JSON.stringify(
            {
                "staffName":$("#exampleInputEmail2").val(),
                "email":$("#exampleInputEmail3").val(),
                "contactNumber":$("#exampleInputEmail4").val(),
                "address":$("#exampleInputPassword1").val(),
            }
        ),
        success: function (response) {
            
        }
    });
    
});